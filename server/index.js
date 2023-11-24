import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// user defined module
import userRoute from "./routes/user.js";
dotenv.config();
const port = 3000;
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then((data) => {
    console.log(`connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoute);
app.listen(port, () => {
  console.log(`running @${port}`);
});
