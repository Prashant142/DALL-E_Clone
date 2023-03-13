import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../Mongodb/Models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts route
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({}); //This will find all the images posted on the db.
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// Create a post route
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body; //Getting these data form frontend
    const photoUrl = await cloudinary.uploader.upload(photo); //Passing the base64 embeded code of photo to upload it on cloudinary.
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    }); //This will create a new post every time. This is the same method used in every other web application to post something to DB.
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
