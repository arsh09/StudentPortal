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
	HANDLE_ADD_STUDENT

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

			options.allow = false 
			this.isCompleting = true
			
			const new_student_json = {}
			const all_qa = survey.getAllQuestions()
			for (const q of all_qa){
				new_student_json[q.name] = survey.data[q.name] ?? ""
			}

			DATABASE_INTERFACE_CHANNEL
			HANDLE_ADD_STUDENT
			const response = await window.ipcRenderer.send( DATABASE_INTERFACE_CHANNEL, {
				responseChannel : `${HANDLE_ADD_STUDENT}-respoonse`,
				params : {
					e : HANDLE_ADD_STUDENT, 
					data : {
						add_student : new_student_json
					}
				}
			})

			console.log( response.data )

			setTimeout( ()=>{
				survey.allow = true
				this.$router.push('/')
				this.handleAddNotification({
					msg : "New student has been added into the database. "
				})

			}, 1000)
		},

		
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