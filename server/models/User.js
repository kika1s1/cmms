import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: string,
      unique: true,
      required: true,
    },
    email: {
      type: string,
      unique: true,
      required: true,
    },
    password: {
      type: string,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
