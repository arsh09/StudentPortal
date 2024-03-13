<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">
        <form-remove-student/>
	</div>
</template>


<script>
import FormRemoveStudent from "@/components/Forms/forms/FormRemoveStudent.vue";

export default {
	name: "PageRemoveStudent",
	components: {
		FormRemoveStudent,
	},
};
</script>