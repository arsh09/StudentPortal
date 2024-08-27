<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">

		<base-button title="Export To CSV" description="Export students entry to CSV (Excel) file" v-on:click="this.handle_export">
			
		</base-button>

		<base-button title="Import From CSV" description="Import students entries from CSV (Excel) file" 
			v-on:click="this.handle_trigger_file_input"
		>
		<template v-slot:default>
			<input type="file" ref="ref_file_input" @change="handle_file_change" accept=".csv" style="display: none;" />
		</template>
		</base-button>

	</div>
</template>

<script>

import Papa from 'papaparse';
import BaseButton from "@/components/Fields/BaseButton.vue";
const { 
	DATABASE_INTERFACE_CHANNEL,
	HANDLE_SQL_QUERY

} = require("@/backend/communication/constants.js")


export default {
	name: "PageSoftwareSettings",

	data(){
		return { 
			// Define your custom header mappings
			header_map : {
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
			}
		}
	},

	components: {
		BaseButton,
	},
	methods : {
        handle_file_selection : function(event){
            console.log( event.target.files )
        },

		handle_export: function()
		{
			console.log("Hello")
		},

		handle_trigger_file_input() {
			this.$refs.ref_file_input.click();
		},

		handle_file_change(event) {
			const file = event.target.files[0];
			if (file) {
				console.log("Selected file:", file.name, file );
				this.handle_read_csv(file);
			}
		},

		handle_read_csv(file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const csv_data = event.target.result;
				this.handle_parse_csv_columns(csv_data);
			};
			reader.readAsText(file);
		},
		
		handle_parse_csv_columns(csv_data) {
			Papa.parse(csv_data, {
				header: true, 
				complete: (results) => {
					const data = results.data;

					

					// Replace the headers based on the mapping
					const mapped_data = data.map(row => {
						const newRow = {};
						for (let key in row) {
						const newKey = this.header_map[key] || key; // Use the mapped header or the original if not found
						newRow[newKey] = row[key];
						}
						return newRow;
					});

					window.ipcRenderer.send( DATABASE_INTERFACE_CHANNEL, {
						responseChannel : `${HANDLE_SQL_QUERY}-respoonse`,
						params : {
							e : HANDLE_SQL_QUERY, 
							data : {
								data_point : mapped_data,
								sql : this.handle_create_add_student_query(),
								type : "INSERT",
							}
						}
					})
					.then( response => {
						console.log( response ) 
					})
					.catch( error => {
						console.log( error ) 
					})
					
				},
				error: (error) => {
					console.error("Error parsing CSV:", error);
				}
			});
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
		}

    }
};
</script>

<style >

input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
}

</style>