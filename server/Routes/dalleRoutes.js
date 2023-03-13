import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// This route will generate the ai photos from openai api.

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration); //this will make new instance of openai configuration for our own application.

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E");
});

//This is the most important route of the web application because it uses the openAI_api_key and generate the base64 encoded image data assign it to the photo field.

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body; //this will take the imput from frontend input field to generate the image from openai
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    }); //This is the response/response_format which we will get from the openai using prompt value.

    const image = aiResponse.data.data[0].b64_json; //this will get the image actual data from aiResponse in base64 encoded image in JSON format and show it on the DOM.

    res.status(200).json({ photo: image }); // This line will send base64 encoded image data to the client and display it on the screen using photo field.
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
