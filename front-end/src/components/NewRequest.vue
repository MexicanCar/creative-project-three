<template>
    <div id="main">
        <div class="menu">
            <h2>{{user.firstName}} {{user.lastName}} <a @click="logout">Logout</a></h2>
        </div>
    <div id="content">
    <div id="request" v-if="!created">
        <label>First Name:</label>
        <input class="info" id="firstname" v-model="firstName" readonly>
        <br>
        <label>Last Name:</label>
        <input class="info" id="lastname" v-model="lastName" readonly>
        <br>
        <label>Phone #:</label>
        <input class="info" id="phone" v-model="phone">
        <br>
        <label>Reason:</label>
        <input class="info" v-model="reason">
        <br>
    <div id="dates">
        <div style="padding-right: 5px">
        <input type="checkbox" v-model="sunday">
        <label for="sunday"> Sunday</label>
        </div>
        <div>
        <input type="checkbox" v-model="tuesday">
        <label for="sunday"> Tuesday</label>
        </div>
    </div>
        <br>
        <button @click.prevent="createRequest">Submit</button>
    </div>
    <div v-else>
        <h2>You have successfully requested an interview!</h2>
        <br>
        <h3>An executive secretary will message you using the phone number</h3>
        <h3>you have provided confirming a time/date for the interview.</h3>
        <br>
        <h2>Refresh page to request another interview.</h2>
    </div>
    </div>
    </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'NewRequest',
  data() {
    return {
        firstName: "",
        lastName: "",
        phone: "",
        reason: "",
        sunday: false,
        tuesday: false,
        created: false
    }
  },
   async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      this.firstName = this.$root.$data.user.firstName;
      this.lastName = this.$root.$data.user.lastName;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
      async createRequest(){
          if(!this.firstName || !this.lastName || !this.phone || !this.reason){
              return;
          }
          await axios.post('/api/request/', {
              firstName: this.firstName,
              lastName: this.lastName,
              phone: this.phone,
              reason: this.reason,
              sunday: this.sunday,
              tuesday: this.tuesday
          });
            this.phone = "";
            this.reason = "";
            this.sunday = false;
            this.tuesday = false;
            this.created = true;
      },
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
*{
    box-sizing: border-box;
    text-align: left;
    margin: 0;
    padding: 0;
    
}
label{
    font-weight: 700;
}
#content{
    padding: 15px;
    border: 2px solid black;
    background-color: white;
}
#request{
    display: flex;
    flex-direction: column;
}
button{
    width: 50px;
    text-align: center;
    margin: 0 auto;
}


.menu a:hover{
    color: grey;
}

.menu a:active{
    color: white;
}

@media only screen and (max-width: 600px){
    *{
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    padding: 0;
    
    }

    .info{
        width: 150px;
    }
    #request{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    

}
</style>
