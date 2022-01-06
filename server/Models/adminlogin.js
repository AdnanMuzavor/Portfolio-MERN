const mongoose = require("mongoose");

const adminlogin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("ADMIN", adminlogin);

module.exports = Admin;
