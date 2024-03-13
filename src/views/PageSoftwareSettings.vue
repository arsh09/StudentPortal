<template>
	<div class="mt-3 shadow shadow-dark m-2 p-2">

		<base-button title="Export To CSV" description="Export students entry to CSV (Excel) file" :isFileOrFolder="true"/>

		<base-button title="Import From CSV" description="Import students entries from CSV (Excel) file"/>

	</div>
</template>

<script>
import BaseButton from "@/components/Fields/BaseButton.vue";

export default {
	name: "PageSoftwareSettings",
	components: {
		BaseButton,
	},
};
</script>

