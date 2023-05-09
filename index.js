import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import auth from "./Routes/Auth.js";
import uploadImage from "./Routes/uploadImage.js";
import AssetRouter from "./Routes/AssetRouter.js";
import cookieParser from "cookie-parser";
import otp from './Routes/otp.js'

import cors from "cors";
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/auth", auth);
app.use("/upload", uploadImage);
app.use("/asset", AssetRouter);
app.use("/otp", otp);

mongoose
  .connect("mongodb://127.0.0.1:27017/asset", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000, () => console.log("database asset connect")))
  .catch((error) => {
    console.log(error);
  });
