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
                gnr_number REAL, 
                extra_data TEXT
            );`
        
        let smt = this.database.prepare(sql)
        smt.run();
    }

    HandleRunQuery(request)
    {
        const response = {}
        if (this.database)
        {
            console.log("Running the query")
            if (request.params.data.sql){
                try{
                    const smt = this.database.prepare( request.params.data.sql )
                    smt.run ( request.params.data.data_point )
                    response.status = true
                    response.msg = "Successfully added the entry into the database."
                } catch(e){
                    console.error(e)
                    response.status = false 
                    response.msg = "Unable to insert the entry into the database."
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

}
