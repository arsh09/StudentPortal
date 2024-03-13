<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
        <form-edit-student/>
	</div>
</template>


<script>
import FormEditStudent from "@/components/Forms/forms/FormEditStudent.vue";

export default {
	name: "PageEditStudent",
	components: {
		FormEditStudent,
	},
};
</script>