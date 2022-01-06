const express = require("express");
const app = express();

//To make server understand json data
app.use(express.json())


//Connecting with dotenv
const dotenv=require("dotenv")
dotenv.config({path:'./.env'})

//Requiring routers
const datarouter = require("./Router/postdatarouter");
const contactrouter = require("./Router/contactrouter");
const adminrouter=require("./Router/adminrouter")
//Using this routers
app.use("/api/mydata", datarouter);
app.use("/api/contacts", contactrouter);
app.use("/api/admin",adminrouter)


const port =process.env.PORT || 5000;

//Mongodb connection part
//Connecting application with database
require("./db/conn")



app.get("/", (req, res) => {
  res.send("Home page");
});

//Creating server
app.listen(port, (req, res) => {
  console.log("listening to port 5000");
});
