const express = require("express");
const app = express();

//To make server understand json data
app.use(express.json());

//For using cookies for storing token
// const cookieparser = require("cookie-parser");
// app.use(cookieparser());

//Connecting with dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

//Requiring routers
const datarouter = require("./Router/postdatarouter");
const contactrouter = require("./Router/contactrouter");
const adminrouter = require("./Router/adminrouter");
const uploadrouter = require("./Router/uploadrouter");
const uploadRouter = require("./Router/uploadrouter");
//Using this routers

app.use("/api/mydata", datarouter);
app.use("/api/contacts", contactrouter);
app.use("/api/admin", adminrouter);
app.use("/api/upload", uploadRouter);

const port = process.env.PORT || 5000;

//Testing cookies
app.get("/contact", (req, res) => {
  res.cookie("test", "thapa");
  res.send("contact page ");
});
//Mongodb connection part
//Connecting application with database
require("./db/conn");

app.get("/", (req, res) => {
  res.send("Home page");
});

//Creating server
app.listen(port, (req, res) => {
  console.log("listening to port 5000");
});
