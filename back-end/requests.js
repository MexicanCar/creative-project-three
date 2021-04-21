const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const requestSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    reason: String,
    sunday: Boolean,
    tuesday: Boolean
});
  
  const Request = mongoose.model('Request', requestSchema);


  router.post("/", validUser, async(req, res) => {
      const interview = new Request({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          reason: req.body.reason,
          sunday: req.body.sunday,
          tuesday: req.body.tuesday
      });
      try{
          await interview.save();
          return res.sendStatus(200);
      }catch (error){
          console.log(error);
          return res.sendStatus(500);
      }
  });

  router.get("/", validUser, async(req, res) => {
      try{
          let interviews = await Request.find();
          return res.send(interviews);
      } catch(error){
          console.log(error);
          return res.sendStatus(500);
      }
  });

  router.delete("/:id", validUser, async(req, res) => {
      try{
          await Request.deleteOne({_id: req.params.id});
      }catch(error){
          console.log(error);
          res.sendStatus(500);
      }
  })

  module.exports = {
    model: Request,
    routes: router,
  }