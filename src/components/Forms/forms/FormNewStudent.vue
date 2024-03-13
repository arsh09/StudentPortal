<template>
	<div>
		<Survey :survey="survey" />
	</div>
</template>


<script>
// import { Survey , Model} from "survey-vue-ui";
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-vue-ui';
import { newStudentFormJson } from "@/components/Forms/json/new_student.js";

export default {
	name: "FormNewStudent",
	components: {
		Survey,
	},
	data() {
		const survey = new Model(newStudentFormJson);
		return {
			survey,
		};
	},
};
</script>