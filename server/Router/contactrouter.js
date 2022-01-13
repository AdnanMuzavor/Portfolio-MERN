// const expressAsyncHandler=require("express-async-handler")
const express = require("express");
const authenticator = require("../Middleware/authenticate");
const app = express();
app.use(express.json());
//Getting message model
const Contact = require("../Models/contact");

//Using app to create contactrouter

const contactrouter = express.Router();

//To post contact message
// contactrouter.post("/",expressAsyncHandler(async(req,res)=>{

// }))

//Sending all contacts/messsages to user
contactrouter.get("/", authenticator, async (req, res) => {
  try {
    const AllMessages = await Contact.find();
    res.status(200).send(AllMessages);
  } catch (e) {
    res.status(422).send({ error: "Unauthorised access" });
  }
});

//To enable user to contact admin/send message
contactrouter.post("/postmessage", async (req, res) => {
  try {
    //Destructuring body data
    const { name, email, message } = req.body;
    console.log(name, email, message, req.body);
    if (!name || !email || !message) {
      return res.status(422).send({ Message: "All fields not filled" });
    }
    //res.json({ message: req.body });
    const Newmessage = new Contact(req.body);
    const messagesent = await Newmessage.save();
    res.status(200).send(messagesent);
  } catch (e) {
    res.status(500).send({ error: "Message not sent" });
  }
});

module.exports = contactrouter;
