const express = require("express");
const authenticator = require("../Middleware/authenticate");
// const expressAsyncHandler=require("express-async-handler")
//Creating router to post data

const datarouter = express.Router();

//Getting userdata model
const PersonalData = require("../Models/mydata");

//Getting cloudinary and multer
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//Posting new things/skills/projects/gallery-content
datarouter.post(
  "/postdata",
  authenticator,

  async (req, res) => {
    try {
      //To upload image to cloudinary

      const { content, category, result } = req.body;
      if (!content || !category) {
        return res.status(422).send({ Error: "All fields not provided" });
      }
      const newpost = new PersonalData({
        image: result.image,
        content: content,
        category: category,
        cloudinary_id: result.cloudinary_id,
      });
      const posteddata = await newpost.save();
      res.status(200).send(posteddata);
    } catch (e) {
      res.status(400).send({ Message: "Unable to post data" });
    }
  }
);

//Deleting existing things/skills/projects/gallery-content
datarouter.delete(
  "/deletedata/:id",
  authenticator,
  upload.single("image"),
  async (req, res) => {
    try {
      const _id = req.params.id;
      const finddata = await PersonalData.findById(_id);
      if (finddata) {
        //To delete image to cloudinary
        await cloudinary.uploader.destroy(finddata.cloudinary_id);
        const deleted = await finddata.remove();
        return res.status(200).send(deleted);
      }

      res.status(200).send({ Message: "Data not found" });
    } catch (e) {
      res.status(400).send({ Message: "Unable to delete data" });
    }
  }
);

//Deleting existing things/skills/projects/gallery-content
datarouter.patch(
  "/editdata/:id",
  authenticator,
  upload.single("image"),
  async (req, res) => {
    try {
      const _id = req.params.id;
      let finddata = await PersonalData.findById(_id);
      if (finddata) {
        //To delete image to cloudinary
        await cloudinary.uploader.destroy(finddata.cloudinary_id);
        //To add new image inplace
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        //Updating user data
        const data = new PersonalData({
          image: result.secure_url,
          content: req.body.content || finddata.content,
          category: req.body.category || finddata.category,
          cloudinary_id: result.public_id,
        });
        console.log(data);
        console.log("updating stage");
        //updating data in database
        finddata = await PersonalData.findByIdAndUpdate(_id, data);
        console.log(finddata);
        // console.log(updateddata)
        // const edited=await updateddata.save()
        // console.log(edited)
        //returning latest data
        return res.status(200).send(finddata);
      }

      res.status(200).send({ Message: "Data not found" });
    } catch (e) {
      res.status(400).send({ Message: "Unable to edit data" });
    }
  }
);

//Sending all my data(skills,gallery,projects etc)
datarouter.get("/", async (req, res) => {
  try {
    const Alluserdata = await PersonalData.find();
    return res.status(200).send(Alluserdata);
  } catch (e) {
    res.status(500).send({ Message: "Could't send data" });
  }
});

module.exports = datarouter;
