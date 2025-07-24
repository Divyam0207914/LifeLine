import RequestLog from '../models/requestLog.model.js';
import Donor from '../models/donor.model.js';

export const getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Find the donor associated with the current user
    const donor = await Donor.findOne({ userId });

    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found.' });
    }

    // Step 2: Use the donor._id to find the requests
    const requests = await RequestLog.find({ toDonor: donor._id })
      .populate('fromUser', 'name email')
      .populate('toDonor', 'location bloodGroup') // optional
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error('Error fetching received requests:', error);
    res.status(500).json({ message: 'Failed to fetch received requests.' });
  }
};
