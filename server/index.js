// Change the type to module to use imoprt export syntax like react in nodejs.

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Mongodb/connect.js";
import postRoutes from "./Routes/postRoutes.js";
import dalleRoutes from "./Routes/dalleRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

const startServer = async () => {
  try {
    connectDB(process.env.Mongo_URI);
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.error(err);
  }
};

startServer();
