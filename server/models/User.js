import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
   
    fullName: {
      type: String,
      default: "kebede",
    },

    ugr: {
      type: String,
      unique: true,
      default: Math.random() * 10,
    },
    department: {
      type: String,
      default: "CSE",
    },

    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
