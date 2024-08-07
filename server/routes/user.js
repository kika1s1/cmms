import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserEvents,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/events/:id", verifyToken, getUserEvents);

router.get("/all", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);

export default router;
