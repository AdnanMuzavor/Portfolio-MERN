//To establish connection with mongoDB
//Mongodb connection part
const mongoose = require("mongoose");

const DB = process.env.DATABASE;
//Connecting application with database
mongoose
  .connect(DB)
  .then(() => console.log("Mongodb connected"))
  .catch((e) => console.log(e));
