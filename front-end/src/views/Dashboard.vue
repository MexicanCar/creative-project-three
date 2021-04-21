<template>
<div class="dashboard">
  <Admin v-if="user && user.role === 'admin'" />
  <MyRequests v-else-if="user" />
  <Login v-else />
</div>
</template>

<script>
import MyRequests from '@/components/MyRequests.vue';
import Login from '@/components/Login.vue';
import Admin from '@/components/Admin.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    MyRequests,
    Login,
    Admin
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>