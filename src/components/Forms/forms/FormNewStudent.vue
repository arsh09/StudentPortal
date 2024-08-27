<template>
	<div class="">
		<Survey v-if="!isCompleting" :survey="survey" />
		
		<div v-if="isCompleting" class="send_spinner" >
		</div>

	</div>
</template>


<script>
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-vue-ui";
import { newStudentFormJson } from "@/components/Forms/json/new_student.js";

import { mapActions } from "vuex";


const { 
	DATABASE_INTERFACE_CHANNEL,
	HANDLE_SQL_QUERY

} = require("@/backend/communication/constants.js")

export default {
	name: "FormNewStudent",
	components: {
		Survey,
	},

	data() {
		const survey = new Model(newStudentFormJson);
		return {
			survey,
			isCompleting : false, 
		};
	},

	mounted() {
		this.survey.onValueChanged.add( this.handle_on_value_changed )
		this.survey.onCompleting.add(this.handle_on_complete);
	},

	methods: {	
		...mapActions("notifications", ["handleAddNotification"]),

		handle_on_value_changed : function(survey, options){
			( survey, options )
		},

		handle_on_complete: async function (survey, options) {
			options
			this.isCompleting = true
			
			const new_student_json = {}
			const all_qa = survey.getAllQuestions()
			for (const q of all_qa){
				new_student_json[q.name] = survey.data[q.name] ?? ""
			}

			new_student_json['school_id'] = ""
			new_student_json['campus_id'] = ""
			new_student_json['extra_data'] = ""

			console.log ( new_student_json )
			const response = await window.ipcRenderer.send( DATABASE_INTERFACE_CHANNEL, {
				responseChannel : `${HANDLE_SQL_QUERY}-respoonse`,
				params : {
					e : HANDLE_SQL_QUERY, 
					data : {
						data_point : new_student_json,
						sql : this.handle_create_add_student_query(),
						type : "INSERT",
					}
				}
			})

			this.handleAddNotification({
				msg : response.data.response.msg
			})

			this.isCompleting = false
			if (response.data.response.status){
				this.$router.push('/')
			}

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

	},
};
</script>


<style scoped>

.send_spinner {
    position: fixed;
    top: 35%;
    left: 45%;
    text-align: center;
    z-index: 100;
    font-size: 58px;
    
	border: 32px solid #f3f3f3; /* Light grey */
	border-top: 32px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 270px;
	height: 270px;
	animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>