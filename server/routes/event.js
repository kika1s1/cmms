import express from "express";
import { createEvent } from "../controllers/event.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifyToken, createEvent);

export default router;
