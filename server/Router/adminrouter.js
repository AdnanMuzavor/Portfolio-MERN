const mongoose = require("mongoose");
const express = require("express");
//Getting admin model
//Getting bcryptjs for hashing password
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminlogin");

//Creating admin router
const adminrouter = express.Router();

//Admin log-in
adminrouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    //Finding the user
    const finduser = await Admin.findOne({ email: email });
    console.log(finduser);
    if (finduser) {
      //Verifyig password with hashed password
      const verify = await bcryptjs.compare(password, finduser.password);
      if (verify) {
        //Generating token with help of data received

        ;
        const token=await finduser.generatetoken();
       
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly:true
        });
        console.log(token);
        res.status(200).send({ Message: "Verified User" });
      } else {
        res.status(400).send({ Message: "Admin login Fail" });
      }
    } else {
      res.status(400).send({ Message: "Admin login Fail" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ Message: "Unauthorised Access" });
  }
});

//Admin Signup(To be used only once)
adminrouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const newuser = new Admin({ email, password });
    console.log(`data before: ${newuser}`);
    //pre middle ware is working here to hash password+saving in mongoDB
   // await newuser.save();
    console.log("Back into main")
    res.status(200).send({Message:"User registered"});
  } catch (e) {
    console.log(e);
    res.status(404).send({ Message: "Unauthorised Access" });
  }
});

module.exports = adminrouter;
