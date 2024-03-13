<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
		<form-new-student/>
	</div>
</template>


<script>

import FormNewStudent from '@/components/Forms/forms/FormNewStudent.vue';

export default {
	name: "PageNewStudent",

	components : {
		FormNewStudent 
	},

	data() {
		return {
			// form: {
			// 	student_name: "",
			// 	address: "",
			// 	birthday: "",
			// 	gender: null,
			// 	nationality: null,
			// 	religion: "",
			// 	admission_date: "",
			// 	b_form_number: "",

			// 	relative_name: "",
			// 	relative_relation: null,
			// 	relative_cnic: "",

			// 	class_id: "",
			// 	group: "",
			// 	remarks: "",
			// 	grn_number: "",
			// 	campus: "",
			// 	school_name: "",
			// 	campus_id: "",
			// 	school_id: "",

			// },

			// gender_options: [
			// 	{ key: 0, value: null, text: "Select An Option" },
			// 	{ key: 1, value: "Male", text: "Male" },
			// 	{ key: 2, value: "Female", text: "Female" },
			// ],

            // guadian_relation: [
			// 	{ key: 0, value: null, text: "Select An Option" },
			// 	{ key: 0, value: "Father", text: "Father" },
			// 	{ key: 1, value: "Mother", text: "Mother" },
			// 	{ key: 2, value: "Brother", text: "Brother" },
			// 	{ key: 3, value: "Sister", text: "Sister" },
			// 	{ key: 4, value: "Other", text: "Other" },
			// ],
		};
	},

	methods: {
		handle_reset_fields: function () {},

		handle_submit_new_students: function () {},
	},
};
</script>