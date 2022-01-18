const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Adminlogin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Creating a middle to execute pre saving

Adminlogin.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Middleware called");
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password)
    console.log("Calling next") 
    console.log("next called")
    await this.save();
  } 
  next();
});

//Function for generating token
const jwt = require("jsonwebtoken");
Adminlogin.methods.generatetoken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

//This should always be at last level
const Admin = mongoose.model("ADMIN", Adminlogin);
module.exports = Admin;
