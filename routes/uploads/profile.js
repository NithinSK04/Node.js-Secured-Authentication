//Imports
const express = require("express");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.post("/profile", async (req, res) => {
  try {
    const cloudinary = await cloudinary.uploader.upload(
      req.files.profile_picture.tempFilePath,
      {
        folder: "personal",
      }
    );
    res.status(200).json({
      msg: "Image Upload successfully!!!",
      url: cloudinary.secure_url,
    });
  } catch (error) {
    // console.log(error);
    res
      .status(422)
      .json({ msg: "Oops something happend!!! Upload again", error: error });
  }
});

module.exports = router;
