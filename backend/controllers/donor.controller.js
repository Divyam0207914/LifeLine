// donor.controller.js
import User from "../models/user.model.js";
import Donor from "../models/donor.model.js";
import Donation from '../models/donation.model.js'
// Create donor profile
export const createDonor = async (req, res) => {
  const { bloodGroup, location, contact, lastDonated, latitude, longitude } = req.body;

  if (!bloodGroup || !location || !contact) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existing = await Donor.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "You are already registered as a donor." });
    }

    const donorData = {
      userId: req.user._id,
      bloodGroup,
      location,
      contact,
      lastDonated: lastDonated ? new Date(lastDonated) : null,
    };

    if (latitude && longitude) {
      donorData.coordinates = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    const donor = await Donor.create(donorData);

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

    if (donor.lastDonated && !donor.availability) {
      // Trying to turn availability ON
      const lastDonatedDate = new Date(donor.lastDonated);
      const nextEligibleDate = new Date(lastDonatedDate.getTime() + 90 * 24 * 60 * 60 * 1000);
      if (new Date() < nextEligibleDate) {
        return res.status(400).json({ message: "You are not eligible to donate yet. Please wait 90 days from your last donation." });
      }
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
    const { page = 1, limit = 10, bloodGroup, city, latitude, longitude, maxDistance = 50000 } = req.query;

    const query = { availability: true };

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query.location = new RegExp(city, 'i');

    if (latitude && longitude) {
      query.coordinates = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance), // Default 50km
        },
      };
    }

    const donors = await Donor.find(query)
      .populate("userId", "name email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const total = await Donor.countDocuments(query);

    res.status(200).json({
      donors,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalDonors: total
    });
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





export const getDonationHistory = async (req, res) => {
  try {
    const donorId = req.user.id;

    const donations = await Donation.find({ donor: donorId }).sort({ date: -1 }).lean();

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};
