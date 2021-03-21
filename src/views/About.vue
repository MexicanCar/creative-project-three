<template>
  <div class="container">
  <div class="about">
    <h1>Welcome to the Interview Helper App</h1>
    <h3>How To Use:</h3>
    <div class="wrapper">
      <div class="column-one">
        <h2>Home Page</h2>
        <h4>The Home Page is split into 3 sections-</h4>
        <h4>1) A list of all the people in the database.</h4>
        <h4>2) A form to add people to the database.</h4>
        <h4>3) Two buttons to display people with</h4>
        <h4> interviews setup/not setup.</h4>
      </div>
      <div class="column-two">
        <h2>Individual Pages</h2>
        <h4>The Individual Pages have many different tools.</h4>
        <h4>1) They contain the persons-</h4>
        <h4>Name, Age, and Phone Number.</h4>
        <h4>2) They allow you to edit/delete the person.</h4>
        <h4>3) They display interview information.</h4>
        <h4>4) They allow you to setup interviews</h4>
        <h4>for the individual.</h4>
        <h4>5) They allow you to 'complete' the interview.</h4>
      </div>
    </div>
  </div>
  <div class="footer">
      <a href="">Github Repository</a>
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