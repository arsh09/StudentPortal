<template>
  <div class="notifications-list">
    <user-notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />

  </div>
</template>

<script>

import UserNotification from "@/components/Notifications/UserNotification";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    UserNotification
  },

  computed: {
    ...mapState("notifications", ["notifications"])
  },
 
  methods : {
      ...mapActions('notifications', ['handleAddNotification']),
  }
};
</script>
