<template>
<div class="main">
  <div class="menu">
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout">Logout</a></h2>
    <h1>Admin View</h1>
    <AdminTools/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
//import AdminTools from '@/components/AdminTools.vue';
import AdminTools from './AdminTools.vue';
export default {
  name: 'Admin',
  components: {
    AdminTools,
  },
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

<style scoped>
.menu a:hover{
    color: grey;
}

.menu a:active{
    color: white;
}
</style>