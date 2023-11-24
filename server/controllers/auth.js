import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
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
      res.json({ message: "user created successfully" });
    });
  } catch (error) {
    next(error);
  }
};
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user does not found"));
    }

    const isMatched = await bcrypt.compare(password, validUser.password);
    if (!isMatched) {
      return next(errorHandler(401, "invalid credentials"));
    }
    const token = await jwt.sign({ id: validUser._id }, process.env.SECRET);
    const { password: pass, ...res } = validUser._doc;
    res
      .cookie("access-token", token, { httpOnly: true })
      .status(200)
      .json({ rest });

    // res.json({})
  } catch (error) {
    next(error);
  }
};
export { signup, signin };
