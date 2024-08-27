const { 
	DATABASE_INTERFACE_CHANNEL,
	HANDLE_SQL_QUERY

} = require("@/backend/communication/constants.js")

export default { 
    
    data(){
        return { 
            csv_to_db_keys : {
				"ADMISSION DATE": "admission_date",
				"B FORM NO": "birth_form_number",
				"CAMPUS SCHOOL NAME": "campus_name",
				"CAMPUS SCHOOL SEMIS ID": "campus_id",
				"CLASS ID": "class_id",
				"DOB": "date_of_birth",
				"FATHER / GUARDIAN CNIC": "guardian_cnic",
				"FATHER / GUARDIAN CONTACT": "guardian_phone",
				"FATHER / GUARDIAN NAME": "guardian_name",
				"GENDER": "gender",
				"GRN": "gnr_number",
				"GROUP": "group_id",
				"MAIN SCHOOL NAME": "school_name",
				"MAIN SEMIS ID": "main_sermis_id",
				"NATIONALITY": "country",
				"RELATION WITH GUARDIAN": "guardian_relation",
				"RELIGION": "religion",
				"REMARKS": "remarks",
				"SR.": "extra_data",
				"STUDENT NAME": "student_name"
			},

            db_to_csv_keys : {
                "admission_date": "ADMISSION DATE",
                "birth_form_number": "B FORM NO",
                "campus_name": "CAMPUS SCHOOL NAME",
                "campus_id": "CAMPUS SCHOOL SEMIS ID",
                "class_id": "CLASS ID",
                "date_of_birth": "DOB",
                "guardian_cnic": "FATHER / GUARDIAN CNIC",
                "guardian_phone": "FATHER / GUARDIAN CONTACT",
                "guardian_name": "FATHER / GUARDIAN NAME",
                "gender": "GENDER",
                "gnr_number": "GRN",
                "group_id": "GROUP",
                "school_name": "MAIN SCHOOL NAME",
                "main_sermis_id": "MAIN SEMIS ID",
                "country": "NATIONALITY",
                "guardian_relation": "RELATION WITH GUARDIAN",
                "religion": "RELIGION",
                "remarks": "REMARKS",
                "extra_data": "SR.",
                "student_name": "STUDENT NAME"
              }
        }
    },
    
    methods : {
        handle_add_student: function(data)
        {
            return new Promise( (resolve, reject) => {
                window.ipcRenderer.send( DATABASE_INTERFACE_CHANNEL, {
                    responseChannel : `${HANDLE_SQL_QUERY}-respoonse`,
                    params : {
                        e : HANDLE_SQL_QUERY, 
                        data : {
                            data_point : data,
                            sql : this.handle_create_add_student_query(),
                            type : "INSERT",
                        }
                    }
                })
                .then( res => resolve(res ) ) 
                .catch( error => reject ( error) )
            })    
        },

        handle_update_student: function(data, gnr_id)
        {
            return new Promise( ( resolve, reject ) => {
                window.ipcRenderer.send(
					DATABASE_INTERFACE_CHANNEL,
					{
						responseChannel: `${HANDLE_SQL_QUERY}-respoonse`,
						params: {
							e: HANDLE_SQL_QUERY,
							data: {
								data_point : data,
								sql: this.handle_create_update_student_query(gnr_id),
								type: "UPDATE",
							},
						},
					}
				)
                .then( res => resolve( res ) ) 
                .catch( err => reject( err ) )
            })
        },

        handle_select_student: function(gnr_id)
        {
            return new Promise( (resolve, reject) => {
                window.ipcRenderer.send(
					DATABASE_INTERFACE_CHANNEL,
					{
						responseChannel: `${HANDLE_SQL_QUERY}-respoonse`,
						params: {
							e: HANDLE_SQL_QUERY,
							data: {
								data_point: {},
								sql: gnr_id ? this.handle_create_search_student_query(gnr_id) : 
                                    this.handle_create_get_all_student_data(),
								type: "SELECT",
							},
						},
					}
				)
                .then ( res => resolve( res ) ) 
                .catch( err => reject ( err ) )
            })
        },

		handle_create_add_student_query: function(){

			const sql = `
				INSERT INTO students(
					student_name, gender, date_of_birth, birth_form_number, country, 
					religion, guardian_name, guardian_cnic, guardian_phone, guardian_relation, 
					school_name, school_id, campus_name, campus_id, admission_date, 
					class_id, group_id, gnr_number, remarks, extra_data
				) 
				
				VALUES( @student_name, @gender, @date_of_birth, @birth_form_number, @country,
					@religion, @guardian_name, @guardian_cnic, @guardian_phone, @guardian_relation, 
					@school_name, @school_id, @campus_name, @campus_id, @admission_date, 
					@class_id, @group_id, @gnr_number, @remarks , @extra_data
				);
			`
			return sql
		},

        handle_create_search_student_query: function (gnr_id) {
			const sql = `
				SELECT student_name, gender, date_of_birth, birth_form_number, country, 
					religion, guardian_name, guardian_cnic, guardian_phone, guardian_relation, 
					school_name, school_id, campus_name, campus_id, admission_date, 
					class_id, group_id, gnr_number, remarks
				
				FROM students 
				WHERE gnr_number='${gnr_id}'
				ORDER BY id
			`;
			return sql;
		},

		handle_create_update_student_query: function (gnr_id) {
			const sql = `
				UPDATE students
				SET
					student_name = @student_name,
					gender = @gender,
					date_of_birth = @date_of_birth,
					birth_form_number = @birth_form_number,
					country = @country,
					religion = @religion,
					guardian_name = @guardian_name,
					guardian_cnic = @guardian_cnic,
					guardian_phone = @guardian_phone,
					guardian_relation = @guardian_relation,
					school_name = @school_name,
					school_id = @school_id,
					campus_name = @campus_name,
					campus_id = @campus_id,
					admission_date = @admission_date,
					class_id = @class_id,
					group_id = @group_id,
					gnr_number = @gnr_number,
					remarks = @remarks,
					extra_data = @extra_data

				WHERE 
					gnr_number = '${gnr_id}';
			`;
			return sql;
		},

        handle_create_get_all_student_data: function () {
			const sql = `
				SELECT student_name, gender, date_of_birth, birth_form_number, country, 
					religion, guardian_name, guardian_cnic, guardian_phone, guardian_relation, 
					school_name, school_id, campus_name, campus_id, admission_date, 
					class_id, group_id, gnr_number, remarks
				
				FROM students 
				ORDER BY id
			`;
			return sql;
		},
    }
}

