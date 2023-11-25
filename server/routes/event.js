import express from "express";
import { createEvent, deleteEvent } from "../controllers/event.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifyToken, createEvent);

router.delete("/delete/:id", verifyToken, deleteEvent);
export default router;
