const express = require("express");
const authenticator=require("../Middleware/authenticate")
// const expressAsyncHandler=require("express-async-handler")
//Creating router to post data

const datarouter = express.Router();

//Getting userdata model
// const PersonalData = require("../Models/mydata");


//Sending all my data(skills,gallery,projects etc)
datarouter.get("/",(req,res)=>{
  res.send("Returning skills,gallery etc")
})

module.exports=datarouter
