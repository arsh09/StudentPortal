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
 };
</script>