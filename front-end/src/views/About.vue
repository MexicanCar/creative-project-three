<template>
  <div class="container">
  <div class="about">
    <h1>Welcome to the Interview Helper App</h1>
    <h3>How To Use:</h3>
    <div class="wrapper">
      <div class="column-one">
        <h2>Home Page</h2>
        <h4></h4>
        <h4>1) Create an account/Login.</h4>
        <h4>2) Fill out the interview request form.</h4>
        <h4>3) Submit the request form.</h4>
      </div>
      <div class="column-two">
        <h2>Admin Dashboard</h2>
        <h4>This is only available to admin users.</h4>
        <h4>1) Lists all of the people (not users) in the database.</h4>
        <h4>2) Allows you to edit/delete the person.</h4>
        <h4>3) Displays interview information.</h4>
        <h4>4) Allows you to setup interviews</h4>
        <h4>for the individual.</h4>
        <h4>5) Allows you to 'complete' the interview.</h4>
        <h4>6) Allows you to check interview requests.</h4>
      </div>
    </div>
  </div>
  <div class="footer">
      <a href="https://github.com/MexicanCar/creative-project-three">Github Repository</a>
      <p>Hours: 4</p>
  </div>
  </div>
  
</template>

<style scoped>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  .about{
    margin: auto;
    background-color: white;
    border-radius: 10%;
    width: 45%;
    height: 35%;
    
  }

.wrapper{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
  
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

.column-one{
  margin: 10px;
  margin-top: 0;

}

.column-two{
  margin: 10px;
  margin-top: 0;
}

h4{
  color: darkslategray;
  margin-top: 5px;
}

@media only screen and (max-width: 600px){
  .container{
    height: 84vh;
}
  .about{
    margin: auto;
    background-color: white;
    width: 100%;
    height: 100%;
    border-radius: 0%;
  }
  h4{
  color: darkslategray;
  margin-top: 5px;
  font-size: 13px;
  }
  .wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  
}



}

</style>