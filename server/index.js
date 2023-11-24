import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// user defined module
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
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
// express middleware
app.use(express.json());

// user defined route middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`running @${port}`);
});
