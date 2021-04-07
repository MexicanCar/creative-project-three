const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});



const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  interview: Boolean,
});

// Create a model for items in the museum.
const Person = mongoose.model('Person', personSchema);

const interviewSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    },
    interviewType: String,
    interviewDate: String,
    interviewTime: String
});

const Interview = mongoose.model('Interview', interviewSchema);

app.post('/api/interviews', async (req, res) => {
    const interview = new Interview({
        interviewType: req.body.interviewType,
        interviewDate: req.body.interviewDate,
        interviewTime: req.body.interviewTime
    });
    try{
        await interview.save();
        res.send(interview);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/people', async(req, res) => {
    const person = new Person({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        interview: req.body.interview
    });
    try{
        await person.save();
        res.send(person);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/people/:personID/interviews', async(req, res) => {
    try{
      console.log(req.params.personID);
        let person = await Person.findOne({_id: req.params.personID});
        if(!person){
            res.send(404);
            return;
        }
        let interview = new Interview({
            person: person,
            interviewType: req.body.interviewType,
            interviewDate: req.body.interviewDate,
            interviewTime: req.body.interviewTime
        });
        await interview.save();
        res.send(interview);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/interviews', async (req, res) => {
    try {
      let interviews = await Interview.find();
      res.send(interviews);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/people', async (req, res) => {
    try {
      let person = await Person.find();
      res.send(person);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/people/:id', async(req, res) => {
      let person = await Person.findOne({
          _id: req.params.id
      });
      res.send(person);
  });

  app.get('/api/people/:personID/interviews', async(req, res) => {
    try {
      let person = await Person.findOne({_id: req.params.personID});
      if (!person) {
          res.send(404);
          return;
      }
      let interviews = await Interview.findOne({person:person});
      res.send(interviews);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.delete('/api/interviews/:id', async(req, res) => {
  try{
    console.log(req.params.id);
    await Interview.deleteOne({
      _id: req.params.id
    });
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/interviews/:id/:personID', async(req, res) => {
  try{
    console.log(req.params.id);
    await Interview.deleteOne({
      _id: req.params.id
    });

    let person = await Person.findOne({
      _id: req.params.personID
    });

    person.interview = false;
    person.save();
    res.send(person);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/people/:id', async(req, res) => {
    try{

      let person = await Person.findOne({
        _id: req.params.id
      });

      await Interview.deleteOne({
        person: person
      });

      await Person.deleteOne({_id: req.params.id});

      console.log("deleted");
    }catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

app.put('/api/interviews/:id', async(req, res) => {
  try{
  let interview = await Interview.findOne({
    _id: req.params.id
  });
  interview.interviewType = req.body.interviewType;
  interview.interviewDate = req.body.interviewDate;
  interview.interviewTime = req.body.interviewTime;
  interview.save();
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/people/:id', async(req, res) => {
    try{
      console.log("hello there");
    let person = await Person.findOne({
      _id: req.params.id
    });
    person.name = req.body.name;
    person.age = req.body.age;
    person.phone = req.body.phone;
    person.interview = req.body.interview;
    person.save();
    res.send(person);
    }catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.put('/api/people/complete/:id', async(req, res) => {
    try{
    let person = await Person.findOne({
      _id: req.params.id
    });
    if(person.interview === false){
      person.interview = true;
    }else{
      person.interview = false;
    }
    person.save();
    }catch(error){
      console.log(error);
      res.sendStatus(500);
    }
  });

app.listen(3001, () => console.log('Server listening on port 3001!'));
