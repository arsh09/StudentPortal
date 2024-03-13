<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
        <form-print-student/>
	</div>
</template>


<script>
import FormPrintStudent from "@/components/Forms/forms/FormPrintStudent.vue";

export default {
	name: "PageLookUpStudent",
	components: {
		FormPrintStudent,
	},
};
</script>