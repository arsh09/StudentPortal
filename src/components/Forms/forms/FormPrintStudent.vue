<template>
	<div class="">
		<Survey v-if="!isCompleting" :survey="survey" />

		<div v-if="isCompleting" class="send_spinner">
		</div>

	</div>
</template>


<script>
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-vue-ui";
import { editStudentFormJson } from "@/components/Forms/json/edit_student.js";

import { mapActions } from "vuex";

const {
	DATABASE_INTERFACE_CHANNEL,
	HANDLE_SQL_QUERY,
} = require("@/backend/communication/constants.js");

export default {
	name: "FormPrintStudent",
	components: {
		Survey,
	},

	data() {
		const survey = new Model(editStudentFormJson);
		survey.completeText = "Print Student"
		survey.title = "Print Student Info"
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
				const response = await window.ipcRenderer.send(
					DATABASE_INTERFACE_CHANNEL,
					{
						responseChannel: `${HANDLE_SQL_QUERY}-respoonse`,
						params: {
							e: HANDLE_SQL_QUERY,
							data: {
								data_point: {},
								sql: this.handle_create_search_student_query(
									options.value
								),
								type: "SELECT",
							},
						},
					}
				);

				if (response.data.response.status) {
					const student =
						response.data.response.data[
							response.data.response.data.length - 1
						];
					survey.setValue("control_q", true);
					Object.keys(student).forEach((key) => {
						const value = student[key];
						survey.setValue(key, value);
					});
				}
			}
		},

		handle_on_complete: async function (survey, options) {
			survey, options;
			options.allow = false 
			

			const new_student_json = {};
			const all_qa = survey.getAllQuestions();
			for (const q of all_qa) {
				new_student_json[q.name] = survey.data[q.name] ?? "";
			}

			new_student_json["school_id"] = "";
			new_student_json["campus_id"] = "";
			new_student_json["extra_data"] = "";

			const gnr_number = new_student_json['gnr_id']
			if (gnr_number && gnr_number.length > 0) {
				this.isCompleting = true;

				const response = await window.ipcRenderer.send(
					DATABASE_INTERFACE_CHANNEL,
					{
						responseChannel: `${HANDLE_SQL_QUERY}-respoonse`,
						params: {
							e: HANDLE_SQL_QUERY,
							data: {
								data_point : new_student_json,
								sql: this.handle_create_update_student_query(gnr_number),
								type: "UPDATE",
							},
						},
					}
				);

				this.handleAddNotification({
					msg: response.data.response.msg,
				});

				this.isCompleting = false;
				if (response.data.response.status) {
					this.$router.push("/");
				}
			} else {
				this.handleAddNotification({
					msg: "Please go back and enter a correct GNR number first."
				});
			}

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