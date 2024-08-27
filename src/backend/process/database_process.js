process.env.UV_THREADPOOL_SIZE=128

import { app } from "electron";

const path = require("path");
const Database = require("better-sqlite3")

export default class DatabaseProcess
{
    constructor()
    {

    }
        
    static GetInstance()
    {
        if ( !DatabaseProcess.instance )
        {
            DatabaseProcess.instance = new DatabaseProcess()
            DatabaseProcess.instance.database = null
            DatabaseProcess.instance.HandleSetupDatabase()
 
        }
        return DatabaseProcess.instance;
    }
 
    HandleSetupDatabase()
    {   
        const db_file = path.join(app.getPath('userData'), "StudentPortal.db");
        console.log("Creating a db file on ", db_file)
        this.database =  new Database( db_file , { readonly: false })
        // this.database.pragma('journal_mode = WAL');
        let sql = `CREATE TABLE IF NOT EXISTS students( 
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                student_name TEXT,
                gender TEXT,
                date_of_birth TEXT,
                birth_form_number TEXT,
                country TEXT,
                religion TEXT,
                guardian_name TEXT,
                guardian_cnic TEXT,
                guardian_phone TEXT,
                guardian_relation TEXT,
                school_name TEXT,
                school_id TEXT,
                campus_name TEXT,
                campus_id TEXT,
                admission_date TEXT,
                class_id TEXT,
                group_id TEXT,
                remarks TEXT,
                gnr_number TEXT, 
                extra_data TEXT,
                student_image TEXT,
                student_image_type TEXT,
                student_image_filename TEXT
            );`
        
        let smt = this.database.prepare(sql)
        smt.run();
    }

    HandleRunQuery(request)
    {
        const response = {}
        if (this.database)
        {
            if (request.params.data.sql){

                if ( request.params.data.type === "INSERT" || request.params.data.type === "UPDATE") {
                    try{
                        const smt = this.database.prepare( request.params.data.sql )
                        if ( Array.isArray( request.params.data.data_point ) ){
                            request.params.data.data_point.forEach( item => {
                                smt.run ( this.HandleFixedQueryRow(item) )
                            })
                        } else { 
                            smt.run ( this.HandleFixedQueryRow(request.params.data.data_point) )
                        }
                        response.status = true
                        response.msg = "Successfully inserted/updated the entry into the database."
                    } catch(e){
                        console.error(e)
                        response.status = false 
                        response.msg = "Unable to insert the entry into the database."
                    }
                }

                else if ( request.params.data.type === "SELECT" ) {
                    try{
                        let smt = this.database.prepare(request.params.data.sql);
                        const data = smt.all();
                        response.data = data
                        response.msg = data.length > 0 ? "" : "Unable to find a student with the given GNR ID"
                        response.status = data.length > 0
                    } catch (e){
                        console.error(e)
                        response.status = false 
                        response.msg = "Unable to insert the entry into the database."
                    }
                }

                else if ( request.params.data.type === "DELETE" ) {
                    try{
                        let smt = this.database.prepare(request.params.data.sql);
                        smt.run ()
                        response.msg = "Entry has been permanently deleted."
                        response.status = true
                    } catch (e){
                        console.error(e)
                        response.status = false 
                        response.msg = "Unable to insert the entry into the database."
                    }
                }

                else {
                    response.status = false 
                    response.msg = "No SQL query type is requested. Please check IPC requests."
                }

            }
            else {
                response.status = false 
                response.msg = "No SQL query is found in the request. Please contact developer."
            }
        }
        else {
            response.status = false 
            response.msg = "Database is not found or it is not initialized properly. Try restarting the software."
        }

        return response
    }

    HandleFixedQueryRow(row){
        const filler_row = {
            "student_name" : "", 
            "gender" : "Male", 
            "date_of_birth" : "0", 
            "birth_form_number" : "0",
            "country" : "", 
            "religion" : "", 
            "guardian_name" : "", 
            "guardian_cnic": "", 
            "guardian_phone" : "", 
            "guardian_relation" : "", 
            "school_name" : "", 
            "school_id" : "", 
            "campus_name": "", 
            "campus_id" : "", 
            "admission_date" : "", 
            "class_id" : "", 
            "group_id" : "", 
            "remarks" : "", 
            "extra_data" : "", 
            "student_image" : "", 
            "student_image_type" : "",
            "student_image_filename" : ""
        }
 
        return { ...filler_row, ...row }
    }

}
