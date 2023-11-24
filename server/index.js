import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.listen(port, () => {
  console.log(`running @${port}`);
});
