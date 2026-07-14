
import express from "express";
import Request from "../models/request.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserRequests, broadcastRequest } from '../controllers/request.controller.js';
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


router.post('/broadcast', authMiddleware, broadcastRequest);

router.get('/my-requests', authMiddleware , getUserRequests);

export default router;
