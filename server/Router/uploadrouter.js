const express = require("express");
const uploadRouter = express.Router();

//Getting cloudinary and multer
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const uploaded = {
      image: result.secure_url,
      cloudinary_id: result.public_id,
    };
    res.send(uploaded);
  } catch (e) {
    res.status(404).send({ Message: "Fail to upload image" });
  }
  //To upload image to cloudinary
});

module.exports = uploadRouter;
