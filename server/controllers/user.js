import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import errorHandler from "../utils/error.js";
import Event from "../models/Event.js";
export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  const id = req.user.id;
  let isAdmin = false;

  const user = await User.findById(id);
  if (user.username === "admin") {
    isAdmin = true;
  }
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  try {
    if (isAdmin) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { ugr: req.body.ugr },
      {
        $set: {
          fullName: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          ugr: req.body.ugr,
          department: req.body.department,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    // console.log(res);

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const user = await User.findById(req.user.id);
      if (user.username == admin) {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted!");
      }
      return next(errorHandler(401, "You can only delete your own account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserEvents = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.username == "admin") {
      const events = await Event.find({});
      return res.status(200).json(events);
    } else if (req.user.id === req.params.id) {
      const events = await Event.find({ userRef: req.params.id });
      res.status(200).json(events);
    } else {
      return next(errorHandler(401, "You can only view your own Event!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json([rest]);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    // const { password: pass, ...rest } = user._doc;

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
