
import express from "express";
import Request from "../models/request.model.js";
import { authMiddleware } from "../middelwares/auth.middelware.js";
import { getUserRequests , getReceivedRequests } from '../controllers/request.controller.js';
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, contact, location, bloodGroup, message } = req.body;

    const request = new Request({
      name,
      contact,
      location,
      bloodGroup,
      message,
      requestedBy: req.user._id,
    });

    await request.save();

    res.status(201).json({ message: "Request logged successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to log request." });
  }
});


router.get('/my-requests', authMiddleware , getUserRequests);

router.get("/received-requests", authMiddleware, getReceivedRequests);

export default router;
