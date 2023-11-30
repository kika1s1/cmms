import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
dotenv.config();
// import { Path } from "mongoose";

// database connect
connectDB();

// user defined module
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import eventRouter from "./routes/event.js";

const port = 3000;
const app = express();

// express middleware
app.use(express.json());
app.use(cookieParser());

// user defined route middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  //   next();
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "cleint", "dist", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`running ${port}`);
});
