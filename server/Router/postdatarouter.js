const express = require("express");
const authenticator = require("../Middleware/authenticate");
// const expressAsyncHandler=require("express-async-handler")
//Creating router to post data

const datarouter = express.Router();

//Getting userdata model
const PersonalData = require("../Models/mydata");

//Posting new things/skills/projects/gallery-content
datarouter.post("/postdata", authenticator,async (req, res) => {
  try {
    const { image, content, category } = req.body;
    if (!image || !content || !category) {
      return res.status(422).send({ Error: "All fields not provided" });
    }
    const newpost = new PersonalData(req.body);
    const posteddata = await newpost.save();
    res.status(200).send(posteddata);
  } catch (e) {
    res.status(400).send({ Message: "Unable to post data" });
  }
});

//Sending all my data(skills,gallery,projects etc)
datarouter.get("/",async (req, res) => {
  try {
    const Alluserdata=await PersonalData.find()
    return res.status(200).send(Alluserdata)
    
  } catch (e) {
    res.status(500).send({Message:"Could't send data"})
  }
});

module.exports = datarouter;
