<template>
<div id="content">
  <div id="request">
    <NewRequest v-if="user" />
    <Login v-else />

  </div>
  <div class="footer">
      <a href="https://github.com/MexicanCar/creative-project-three">Github Repository</a>
      <p>Hours: 4</p>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import Login from '@/components/Login.vue';
import NewRequest from '@/components/NewRequest.vue';

export default {
  name: 'Home',
components: {
    Login,
    NewRequest
  },
  data() {
    return {
    people: [],
    newName: "",
    newPhone: "",
    newAge: null,
    newID: "",
    interview: false,
    interviewType: "",
    interviewDate: "",
    interviewTime: "",
    showHasInterviews: false,
    showNotInterviews: false,
    }
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

<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  input{
    width: 150px;
  }

  label{
    display: block;
    text-align: center;
  }

  #content{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }


  .button{
    margin: 3px;
  }

  #buttons{
    display: flex;
    justify-content: center;
  }

.footer{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    background-color: lightpink;
    height: 50px;
    width: 100%;
}

.footer a{
  color: #2c3e50;
  text-decoration: none;
}

  #extra-info{
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    margin: 5px;
    padding: 10px;
    width: 150px;
    background-color: white;
  }

  #add{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    border: 2px solid black;
    margin: 5px;
    padding: 10px;
    background-color: white;
  }

  .list{
    display: flex;
    flex-direction: column;
    align-content: center;
    border: 2px solid black;
    margin: 5px;
    padding: 10px;
    background-color: white;
  }

  .new-list{
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 5px;
    padding: 10px;
  }

  .person{
    display: flex;
    width: 100%;
    margin: 15px 0px;
    text-decoration: none;
    color: black;
  }

  @media only screen and (max-width: 600px){
    #content{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }

    .person{
    display: flex;
    width: 100%;
    margin: 15px 0px;
    text-decoration: none;
    color: black;
    justify-content: center;
  }

    #extra-info{
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    margin: 5px;
    padding: 10px;
    width: 97.5%;
    background-color: white;
  }
  }
</style>
