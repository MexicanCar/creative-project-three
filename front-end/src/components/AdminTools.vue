<template>
<div id="content">
  <div class="list">
    <router-link class="person" v-for="person in people" :key="person.id" :to="'/person/' + person._id">{{person.name}}<br></router-link>
  </div>
  <div id="add">
    <h3>Add New Person</h3>
    <form @submit.prevent="newPerson">
      <label>Name:</label>
      <input v-model="newName">
      <br>
      <label>Phone Number:</label>
      <input v-model="newPhone">
      <br>
      <label>Age:</label>
      <input v-model="newAge">
      <br>
      <label>Interview Type:</label>
      <input v-model="interviewType">
      <br>
      <label>Interview Date:</label>
      <input v-model="interviewDate">
      <br>
      <label>Interview Time:</label>
      <input v-model="interviewTime">
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>
  <div id="extra-info">
    <form id="buttons">
      <button class="button" type="submit" @click.prevent="hasInterviews">Setup</button>
      <br>
      <button class="button" type="submit" @click.prevent="notHasInterviews">Not Setup</button>
    </form>
    <div class="new-list" v-if="showHasInterviews">
      <router-link class="person" v-for="person in interviews" :key="person.id" :to="'/person/' + person._id">{{person.name}}<br></router-link>
    </div>
    <div class="new-list" v-if="showNotInterviews">
      <router-link class="person" v-for="person in nointerviews" :key="person.id" :to="'/person/' + person._id">{{person.name}}<br></router-link>
    </div>
  </div>
  <div class="requests">
      <h3>Interview Requests:</h3>
      <p v-if="deleted"><strong>Refresh the page to show updated requests.</strong></p>
      <div class="request" v-for="request in requests" v-bind:key="request._id">
        <p >
            <strong>Name:</strong> {{request.firstName}}  {{request.lastName}}  
        </p>
        <p><strong>Phone #:</strong> {{request.phone}}</p>
        <p><strong>Days Available:</strong></p>
        <p v-if="request.sunday">Sunday</p>
        <p v-if="request.tuesday">Tuesday</p>
        <p><strong>Reason:</strong> {{request.reason}}</p>
        
        <button @click.prevent="deleteRequest(request._id)">Delete</button>
      </div>
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

export default {
  name: 'AdminTools',

  data() {
    return {
    people: [],
    requests: [],
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
    deleted: false
    }

  },
  created(){
    this.getPeople();
    this.getRequests();
  },

  computed: {
    // people(){
    //   return this.$root.$data.people;
    // },
    interviews(){
      let ints = this.people.filter(person => person.interview === true);
      return ints;
    },
    nointerviews(){
      let noInts = this.people.filter(person => person.interview != true);
      return noInts;
    }
  },
  methods: {
    async getPeople(){
      let response = await axios.get("/api/people");
      this.people = response.data;
      return true;
    },
    async getRequests(){
        let response = await axios.get("/api/request/");
        this.requests = response.data;
        return true;
    },
    async deleteRequest(id){
        this.deleted = true;
        await axios.delete("/api/request/" + id);
        
        console.log("deleted");
        await this.getRequests();
        this.$forceUpdate();
    },
    async newPerson(){
      if(this.interviewType != ""){
        this.interview = true;
      }
       let response = await axios.post("/api/people", {
        name: this.newName,
        phone: this.newPhone,
        age: this.newAge,
        interview: this.interview
      });

      let person = response.data;

      await this.getPeople();

      this.newName = "";
      this.newPhone = "";
      this.newAge = "";

      this.$forceUpdate();

      if(this.interview === true){
        await axios.post('/api/people/'+person._id+'/interviews',{
          person: person,
          interviewType: this.interviewType,
          interviewDate: this.interviewDate,
          interviewTime: this.interviewTime
        });

      this.interviewType = "";
      this.interviewDate = "";
      this.interviewTime = "";
      this.interview = false;
      
      }
      
      
  },
  hasInterviews(){
    if(this.showHasInterviews){
      this.showHasInterviews = false;
    }else{
      this.showHasInterviews = true;
      this.showNotInterviews = false;
    }
  },
  notHasInterviews(){
    if(this.showNotInterviews){
      this.showNotInterviews = false;
    }else{
      this.showNotInterviews = true;
      this.showHasInterviews = false;
    }
  },
  }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

    .request{
        margin-top: 10px;
        margin-bottom: 10px;
        padding-bottom: 3px;
        border-bottom: 1px solid black;
        text-align: left;
    }

    .requests{
        display: flex;
    flex-direction: column;
    align-content: center;
    border: 2px solid black;
    margin: 5px;
    padding: 10px;
    background-color: white;
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

  .request{
        margin-top: 10px;
        margin-bottom: 10px;
        padding-bottom: 3px;
        border-bottom: 1px solid black;
        text-align: center;
    }

    .requests{
        background-color: white;
        border: 2px solid black;
        width: 97.5%;
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
