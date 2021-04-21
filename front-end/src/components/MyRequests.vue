<template>
<div class="main">
  <div class="menu">
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout">Logout</a></h2>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MyRequests',
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>