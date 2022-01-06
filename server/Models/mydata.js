//Model for Gallery Images + Skill Images + Project-card

const mongoose = require("mongoose");
const Mydata = new mongoose.Schema({
  image: {
    type: String,
  },
  content: {
    type: String,
  },
  category:{
      type:String
  }
});

const Personaldata = mongoose.model('PERSONALDATA', Mydata);

module.exports = Personaldata;
