<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> 
      <router-link v-if="user && user.role==='admin'" to="/dashboard"> | Dashboard</router-link>
    </div>
    <router-view/>

    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "app",
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
  },
  
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body{
  background-color: lightcyan;
  
}



#nav {
  font-size: 30px;
  padding: 30px;
  background-color: lightpink;
}

#nav a {
  font-weight: bold;
  
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: gray;
}

</style>
