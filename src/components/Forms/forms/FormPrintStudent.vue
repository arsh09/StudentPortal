<template>
	<div class="">
		<Survey v-if="!isCompleting" :survey="survey" />

		<div v-if="isCompleting" class="send_spinner">
		</div>
		<b-button @click="this.handle_save_pdf" block>
			Save As PDF 
		</b-button>
	</div>
</template>


<script>
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-vue-ui";
import { SurveyPDF } from "survey-pdf";

import { editStudentFormJson } from "@/components/Forms/json/edit_student.js";

import { mapActions } from "vuex";
import MixinSql from '@/components/Mixins/MixinSql';

export default {
	name: "FormPrintStudent",
	components: {
		Survey,
	},

	mixins: [MixinSql],

	data() {
		const survey = new Model(editStudentFormJson);
		survey.completeText = "Print Student";
		survey.title = "Print Student Info";
		return {
			survey,
			isCompleting: false,
		};
	},

	mounted() {
		this.survey.onValueChanged.add(this.handle_on_value_changed);
		this.survey.onCompleting.add(this.handle_on_complete);
	},

	methods: {
		...mapActions("notifications", ["handleAddNotification"]),

		handle_on_value_changed: async function (survey, options) {
			survey, options;

			if (options.name === "gnr_id" && options.value) {
				const response = await this.handle_select_student( options.value ) 
				
				if (response.data.response.status) {
					const student =
						response.data.response.data[
							response.data.response.data.length - 1
						];
					survey.setValue("control_q", true);

					Object.keys(student).forEach((key) => {
						if ( !key.includes("image") ){
							const value = student[key];
							survey.setValue(key, value);
						}
					});

					if ( student['student_image'].length > 0 ) {
						const image = [{
							content : student['student_image'],
							name : student['student_image_filename'], 
							type : student['student_image_type']
						}]
						survey.setValue('student_image' , image )
					}
				}
			}
		},

		handle_on_complete: async function (survey, options) {
			survey, options;
			options.allow = false;

			const new_student_json = {};
			const all_qa = survey.getAllQuestions();
			for (const q of all_qa) {
				new_student_json[q.name] = survey.data[q.name] ?? "";
			}

			new_student_json["school_id"] = "";
			new_student_json["campus_id"] = "";
			new_student_json["extra_data"] = "";

			const gnr_number = new_student_json["gnr_id"];
			if (gnr_number !== "") {
				this.isCompleting = true;

				const response = await this.handle_update_student(new_student_json, gnr_number)

				this.handleAddNotification({
					msg: response.data.response.msg,
				});

				this.isCompleting = false;
				if (response.data.response.status) {
					this.$router.push("/");
				}
			} else {
				this.handleAddNotification({
					msg: "Please go back and enter a correct GNR number first.",
				});
			}

			this.handleAddNotification({
				msg: "Print student information to a PDF file is not implemented yet. Please try in next versions.",
			});
		},

		handle_save_pdf: function() {

			const surveyData = this.survey.data 
			const pdfDocOptions = {
				fontSize: 12
			};

			const surveyPdf = new SurveyPDF(editStudentFormJson, pdfDocOptions);
			surveyPdf.data = surveyData;
			surveyPdf.save();
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