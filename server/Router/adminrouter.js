const mongoose = require("mongoose");
const express = require("express");
//Getting admin model
const Admin = require("../Models/adminlogin");

//Creating admin router
const adminrouter = express.Router();

//Admin log-in
adminrouter.post("/", (req, res) => {
  res.status(200).send({ Message: "Admin login" });
});

//Admin Signup(To be used only once)
adminrouter.post("/signup", (req, res) => {
  res.status(200).send({ Message: "Admin sign-up" });
});

module.exports=adminrouter
