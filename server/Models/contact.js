//Schema for project cards
const mongoose = require("mongoose");
const contactdata = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model('CONTACT', contactdata);

module.exports = Contact;
