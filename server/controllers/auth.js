import User from "../models/User.js";
import bcrypt from "bcryptjs";
const signup = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};
export { signup };
