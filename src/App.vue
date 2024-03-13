<template>
	<div id="app">
		<user-notification-list />
		<base-banner />
		<router-view />
	</div>
</template>


<script>
import UserNotificationList from "@/components/Notifications/UserNotificationList.vue";
import BaseBanner from "@/components/Fields/BaseBanner.vue";

export default {
	name: "App",
	components: {
		BaseBanner,
		UserNotificationList,
	},
};

</script>