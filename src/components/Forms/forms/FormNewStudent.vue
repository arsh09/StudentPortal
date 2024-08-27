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

import MixinSql from "@/components/Mixins/MixinSql"


export default {
	name: "FormNewStudent",

	components: {
		Survey,
	},
	
	mixins: [MixinSql],

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
				if ( q.name === "student_image" ) {
					if ( survey.data[q.name] ) {
						new_student_json[q.name] = survey.data[q.name][0].content ?? "";
						new_student_json[`student_image_type`] = survey.data[q.name][0].type ?? ""
						new_student_json[`student_image_filename`] = survey.data[q.name][0].name ?? ""
					} else {
						new_student_json[q.name] = ""
						new_student_json[`student_image_type`] = ""
						new_student_json[`student_image_filename`] = ""
					}
				} else {
					new_student_json[q.name] = survey.data[q.name] ?? "";
				}
			}

			new_student_json['school_id'] = ""
			new_student_json['campus_id'] = ""
			new_student_json['extra_data'] = ""

			const response = await this.handle_add_student()
			this.handleAddNotification({
				msg : response.data.response.msg
			})

			this.isCompleting = false
			if (response.data.response.status){
				this.$router.push('/')
			}

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