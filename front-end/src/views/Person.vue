<template>
<div class="container">
    <div v-if="!person">
        <h3>This User has been deleted!</h3>
        <h1>Press HOME to return to the previous page.</h1>
    </div>
    <div class="wrapper" v-else>
      <div class="true-interview" v-if="person.interview">
        <div class="person">
            <div id="person-info">
              <h3 class="name" v-text="person.name"></h3>
              <h4 v-text="'Phone #: ' +person.phone"></h4>
              <h4 v-text="'Age: ' + person.age"></h4>
              <h4 v-text="interviews.interviewType"></h4>
              <h4 v-text="'Date/Time: ' + interviews.interviewDate + ' ' + interviews.interviewTime"></h4>
            </div>
            <div id="edit-person" v-if="this.visible">
              <form @submit.prevent="editPerson">
              <label>Name: </label>
              <input v-model="name">
              <br>
              <label>Phone Number: </label>
              <input v-model="phone">
              <br>
              <label>Age: </label>
              <input v-model="age">
              <br>
              <button type="submit" @click.prevent="editPerson">Submit</button>
              </form>
            </div>

            <div>
              <form id="buttons">
              <button class="button" type="submit" @click="deletePerson">Delete Person</button>
              <button class="button" type="submit" @click.prevent="setVisible">Edit Person</button>
              <button class="button" type="submit" @click.prevent="completeInterview">Interview Complete</button>
              </form>
            </div>
            
        </div>
      </div>

      

      <div id="setup-interview" v-else>

        <div class="information">
        <h3 class="name" v-text="person.name"></h3>
        <h4 v-text="'Phone #: ' +person.phone"></h4>
        <h4 v-text="'Age: ' + person.age"></h4>
        <div v-if="this.visible">
              <form class="edit-person" @submit.prevent="editPerson">
              <label>Name: </label>
              <input v-model="name">
              <br>
              <label>Phone Number: </label>
              <input v-model="phone">
              <br>
              <label>Age: </label>
              <input v-model="age">
              <br>
              <button type="submit">Submit</button>
              </form>
        </div>

            <div>
              <button class="button" @click="deletePerson">Delete Person</button>
              <button class="button" @click="setVisible">Edit Person</button>
            </div>
        </div>
        <div id="setup">
        <h3>Setup an Interview</h3>
          <form @submit.prevent="setupInterview">
            <label>Interview Type: </label>
            <input class="int-class" v-model="interviewType">
            <br>
            <label>Interview Date: </label>
            <input class="int-class" v-model="interviewDate">
            <br>
            <label>Interview Time: </label>
            <input class="int-class" v-model="interviewTime">
            <br>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <div class="footer">
      <a href="https://github.com/MexicanCar/creative-project-three">Github Repository</a>
  </div>
</div>
</template>

<style scoped>

*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;

  }
#setup-interview{
  display: flex;
  justify-content: center;

}

.container{
  height: 84vh;
}

.information{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrapper{
  display: flex;
  justify-content: center;
  background-color: white;
  width: 30%;
  margin: auto;
  border-radius: 15%;
}

label{
    display: block;
    text-align: center;
  }

.name{
  border-bottom: 3px solid black;
}

#edit-person{
  margin-left: 10px;
  margin-right: 5px;
}

#setup{
  margin-left: 5px;
}

.button{
  height: 20px;
  margin: 3px;
}

#buttons{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100%;
  margin-left: 5px;
}

.true-interview{
  display: flex;
  justify-content: center;
}

.person{
  display: flex;
  justify-content: center;
}

.int-class{
  margin-left: 3px;
}

.footer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    background-color: rgb(252, 236, 16);
    height: 50px;
    width: 100%;
}

.footer a{
  color: #2c3e50;
  text-decoration: none;
}

@media only screen and (max-width: 600px){
  .wrapper{
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 0%;
}

.true-interview{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#setup-interview{
  display: flex;
  flex-direction: column;
}

#setup{
  margin-top: 20px;
}

.person{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.name{
  font-size: 25px;
  border-bottom: 3px solid black;
}

}
</style>

<script>
import axios from 'axios';

export default {
  name: 'Person',
  data(){
    return{
      person: {},
      interviews: {},
      people: [],
      interview: true,
      interviewType: "",
      interviewDate: "",
      interviewTime: "",
      visible: false,
      name: "",
      phone: "",
      age: "",
      exists: false
    }
  },
  async created() {
    if(await this.getPerson()){
      this.exists = true;
      if( this.person.interview === true){
        await this.getInterview();
      }
    }
  },
  methods:{
    async getPerson(){
      let response = await axios.get("/api/people/" + this.$route.params.id);
      this.person = response.data;
      return true;
    },
    async getInterview(){
      let response = await axios.get("/api/people/" + this.$route.params.id + "/interviews");
      this.interviews = response.data;
      console.log(this.interviews._id);
      return true;
    },
    async setupInterview(){
      let response = await axios.post('/api/people/'+this.person._id+'/interviews',{
          person: this.person,
          interviewType: this.interviewType,
          interviewDate: this.interviewDate,
          interviewTime: this.interviewTime
      });
        this.interviews = response.data;
        this.person.interview = true;
        await axios.put('/api/people/complete/' + this.$route.params.id);
    
      this.interviewType = "";
      this.interviewDate = "";
      this.interviewTime = "";
     await this.getInterview();
     await this.getPerson();
    },

    async deletePerson(){
      console.log("Deleting");
        this.person = null;
        await axios.delete("/api/people/" + this.$route.params.id);
        

        // await axios.delete("/api/interviews/" + this.interviews._id);
        this.interviews = null;
        this.exists = false;
    },

    setVisible(){
      if(this.visible === false){
        this.visible = true;
      }else{
        this.visible = false;
      }
    },
    async editPerson(){
      if(this.name != ""){
        this.person.name = this.name;
      }

      if(this.phone != ""){
        this.person.phone = this.phone;
      }

      if(this.age != ""){
        this.person.age = this.age;
      }

      await axios.put('/api/people/' + this.$route.params.id, {
        
        name: this.person.name,
        age: this.person.age,
        phone: this.person.phone,
        interview: this.person.interview
      });

      this.visible = false;
      this.phone = "";
      this.name = "";
      this.age = "";

      
    },
    async completeInterview(){
      let response = await axios.delete("/api/interviews/" + this.interviews._id + "/" + this.$route.params.id);
        this.interviews = null;
      this.person = response.data;
      this.interviewType = "";
      this.interviewDate = "";
      this.interviewTime = "";
      
      this.getPerson();


    }
  }
}
</script>