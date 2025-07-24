// donor.controller.js
import User from "../models/user.model.js";
import Donor from "../models/donor.model.js";
import Donation from '../models/donation.model.js'
// Create donor profile
export const createDonor = async (req, res) => {
  const { bloodGroup, location, contact, lastDonated } = req.body;

  if (!bloodGroup || !location || !contact) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existing = await Donor.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "You are already registered as a donor." });
    }

    const donor = await Donor.create({
      userId: req.user._id,
      bloodGroup,
      location,
      contact,
      lastDonated: lastDonated ? new Date(lastDonated) : null,
    });

    res.status(201).json({ message: "Donor profile created successfully", donor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Check donor profile
export const getMyDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(200).json({ isDonor: false });
    }

    res.status(200).json({ isDonor: true, donor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Toggle donor availability
export const toggleAvailability = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    if (!donor) {
      return res.status(404).json({ message: "Donor profile not found" });
    }

    donor.availability = !donor.availability;
    await donor.save();

    res.status(200).json({ availability: donor.availability });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all available donors
export const getAllAvailableDonors = async (req, res) => {
  try {
    const donors = await Donor.find({ availability: true }).populate(
      "userId",
      "name email"
    );
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// export const getDonationHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     // You should replace this with actual DB query
//     const history = await Donation.find({ donor: userId }).sort({ date: -1 });

//     res.status(200).json(history);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch donation history." });
//   }
// };


export const getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await Request.find({ requester: userId }).sort({ date: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch request history." });
  }
};



export const getDonationHistory = async (req, res) => {
  try {
    const donorId = req.user.id;

    const donations = await Donation.find({ donor: donorId }).sort({ date: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};
