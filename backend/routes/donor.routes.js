import express from 'express';
import {
  createDonor,
  getAllAvailableDonors,
  getMyDonorProfile,
  toggleAvailability,
  getDonationHistory
} from '../controllers/donor.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import Donor from '../models/donor.model.js';

const donorRoutes = express.Router();

donorRoutes.patch('/availability', authMiddleware, toggleAvailability);

//  Protected route — Only logged-in users can create donor profile
donorRoutes.post('/create', authMiddleware, createDonor);

//  Public route — Anyone can view available donors
donorRoutes.get('/all', getAllAvailableDonors);

//  Protected route — View my own donor profile
donorRoutes.get('/me', authMiddleware, getMyDonorProfile);



donorRoutes.get('/history', authMiddleware, getDonationHistory);


donorRoutes.get('/status', authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    res.status(200).json({
      isDonor: !!donor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default donorRoutes;
