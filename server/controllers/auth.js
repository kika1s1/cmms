import User from "../models/User.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save().then(() => {
      res.send("user created successfully");
    });
  } catch (error) {
    next(error);
  }
};
export { signup };
