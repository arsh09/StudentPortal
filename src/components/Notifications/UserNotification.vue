<template>

	<b-toast 
		:id="notification.id" 
		:variant="notification.type" 
		:auto-hide-delay="notification.delay" 
		:title="notification.title" 
		visible 
		v-on:hide="handleRemoveNotification(notification)"
		toaster="b-toaster-top-center"
		append-toast
		solid  >
		{{ notification.msg }}
	</b-toast>

</template>


<script>
import { mapActions } from "vuex";

export default {
	props: {
		notification: {
			type: Object,
		},
	},

	data() {
		return {
			showToast: true,
		};
	},

	methods: {
		...mapActions("notifications", ["handleRemoveNotification"]),
	},
};
</script>
