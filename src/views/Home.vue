<template>
<div id="content">
  <div class="list">
    <router-link class="person" v-for="person in people" :key="person.id" :to="'/person/' + person.id">{{person.name}}<br></router-link>
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
      <router-link class="person" v-for="person in interviews" :key="person.id" :to="'/person/' + person.id">{{person.name}}<br></router-link>
    </div>
    <div class="new-list" v-if="showNotInterviews">
      <router-link class="person" v-for="person in nointerviews" :key="person.id" :to="'/person/' + person.id">{{person.name}}<br></router-link>
    </div>
  </div>

  <div class="footer">
      <a href="">Github Repository</a>
  </div>
</div>

</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',

  data() {
    return {
    newName: "",
    newPhone: "",
    newID: "",
    interview: false,
    interviewType: "",
    interviewDate: "",
    interviewTime: "",
    showHasInterviews: false,
    showNotInterviews: false,
    }

  },

  computed: {
    people(){
      return this.$root.$data.people;
    },
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
    newPerson(){

      if(this.interviewType != ""){
        this.interview =  true;
      }
      this.people.push({
        id: this.$root.$data.people[this.$root.$data.people.length-1].id+1,
        name: this.newName,
        phone: this.newPhone,
        interview: this.interview,
        interviewType: this.interviewType,
        interviewDate: this.interviewDate,
        interviewTime: this.interviewTime
      });
      this.newName = "";
      this.newPhone = "";
      this.newID = "";
      this.interview = false;
      this.interviewType = "";
      this.interviewDate = "";
      this.interviewTime = "";
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
    align-items: center;
    margin-top: auto;
    background-color: rgb(47, 255, 245);
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
