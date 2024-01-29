<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
		<b-card title="New Student" style="" class="mb-2  border border-0">
			<b-card-text>
				Please enter all the fields.
			</b-card-text>
			<b-card-body>
				<b-form @submit="handle_submit_new_students" @reset="handle_reset_fields">

					<b-row>
						<b-col>
							<b-form-group id="input-group-1" label="Student Name:" label-for="input-1">
								<b-form-input id="input-1" v-model="form.student_name" type="text" placeholder="Enter student fullname" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-2" label="Date of Birth:" label-for="input-2">
								<b-form-datepicker id="input-group-2" v-model="form.birthday" class="mb-2" placeholder="Enter student date of birth" required></b-form-datepicker>
							</b-form-group>
						</b-col>
					</b-row>

					<b-row>
						<b-col>
							<b-form-group id="input-group-3" label="Gender:" label-for="input-3">
								<b-form-select id="input-3" v-model="form.gender" :options="gender_options" placeholder="Select student gender" required></b-form-select>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-4" label="Nationality:" label-for="input-4">
								<b-form-input id="input-4" v-model="form.nationality" type="text" placeholder="Enter student nationality" required></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>

                    <b-row>
						<b-col>
							<b-form-group id="input-group-5" label="Religion:" label-for="input-5">
								<b-form-input id="input-5" v-model="form.religion" type="text" placeholder="Enter student religion" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-6" label="Admission Date:" label-for="input-6">
								<b-form-datepicker id="input-group-6" v-model="form.admission_date" class="mb-2" placeholder="Enter admission date" required></b-form-datepicker>
							</b-form-group>
						</b-col>
					</b-row>

                    <b-row>
						<b-col>
							<b-form-group id="input-group-7" label="Birth (B) Form Number:" label-for="input-7">
								<b-form-input id="input-7" v-model="form.b_form_number" type="number" placeholder="Enter student birth (b) form number" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-8" label="Admission Date:" label-for="input-8">
								<b-form-datepicker id="input-group-8" v-model="form.admission_date" class="mb-2" placeholder="Enter admission date" required></b-form-datepicker>
							</b-form-group>
						</b-col>
					</b-row>

                    <b-row>
						<b-col>
							<b-form-group id="input-group-9" label="House Address:" label-for="input-9">
								<b-form-input id="input-9" v-model="form.address" type="text" placeholder="Enter student house address" required></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>

                    <b-row>
						<b-col>
							<b-form-group id="input-group-10" label="Guardian Name:" label-for="input-10">
								<b-form-input id="input-10" v-model="form.relative_name" type="number" placeholder="Enter student's guardian name" required></b-form-input>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-11" label="Relation:" label-for="input-11">
								<b-form-select id="input-group-11" v-model="form.relative_relation" :options="guadian_relation" class="mb-2" placeholder="Select guardian relation to student" required></b-form-select>
							</b-form-group>
						</b-col>
                        <b-col>
							<b-form-group id="input-group-12" label="Guadian CNIC Number:" label-for="input-12">
								<b-form-input id="input-group-12" v-model="form.relative_cnic" class="mb-2" placeholder="Enter guandian CNIC number" required></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>



					<b-row class="m-2">
						<b-button type="submit" block variant="outline-dark">Submit New Student</b-button>
					</b-row>
					<b-row class="m-2">
						<b-button type="reset" block variant="outline-danger">Reset</b-button>
					</b-row>

				</b-form>
			</b-card-body>
		</b-card>
	</div>
</template>


<script>
export default {
	name: "PageNewStudent",

	data() {
		return {
			form: {
				student_name: "",
				address: "",
				birthday: "",
				gender: null,
				nationality: null,
				religion: "",
				admission_date: "",
				b_form_number: "",

				relative_name: "",
				relative_relation: null,
				relative_cnic: "",

				class_id: "",
				group: "",
				remarks: "",
				grn_number: "",
				campus: "",
				school_name: "",
				campus_id: "",
				school_id: "",

			},

			gender_options: [
				{ key: 0, value: null, text: "Select An Option" },
				{ key: 1, value: "Male", text: "Male" },
				{ key: 2, value: "Female", text: "Female" },
			],

            guadian_relation: [
				{ key: 0, value: null, text: "Select An Option" },
				{ key: 0, value: "Father", text: "Father" },
				{ key: 1, value: "Mother", text: "Mother" },
				{ key: 2, value: "Brother", text: "Brother" },
				{ key: 3, value: "Sister", text: "Sister" },
				{ key: 4, value: "Other", text: "Other" },
			],
		};
	},

	methods: {
		handle_reset_fields: function () {},

		handle_submit_new_students: function () {},
	},
};
</script>