<template>
	<div id="app">
		<base-banner />
		<router-view />
	</div>
</template>


<script>
import BaseBanner from "@/components/Fields/BaseBanner.vue";

export default {
	name: "App",
	components: {
    BaseBanner
  }
};
</script>