import Request from '../models/request.model.js';
import RequestLog from '../models/requestLog.model.js';
import Donor from '../models/donor.model.js';
import Notification from '../models/notification.model.js';

export const getUserRequests = async (req, res) => {
    try {
        const requests = await Request.find({ requestedBy: req.user._id }).sort({ createdAt: -1 }).lean();
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch request history" });
    }
};


export const broadcastRequest = async (req, res) => {
  try {
    const { bloodGroup, hospitalName, address, urgency, message, latitude, longitude, maxDistance = 50000 } = req.body;

    const request = new Request({
      bloodGroup,
      hospitalName,
      address,
      urgency,
      message,
      isBroadcast: true,
      requestedBy: req.user._id,
    });
    await request.save();

    // Compatible donors map (Receiver needs -> Compatible donors)
    const compatibility = {
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'O+': ['O+', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'AB+': ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      'A-': ['A-', 'O-'],
      'O-': ['O-'],
      'B-': ['B-', 'O-'],
      'AB-': ['AB-', 'A-', 'B-', 'O-']
    };

    const compatibleDonors = compatibility[bloodGroup] || [bloodGroup];

    // Find nearby eligible donors
    const query = { availability: true, bloodGroup: { $in: compatibleDonors } };
    if (latitude && longitude) {
      query.coordinates = {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: parseInt(maxDistance),
        },
      };
    }

    const nearbyDonors = await Donor.find(query).lean();

    // Create logs and notify
    const logs = [];
    const notifications = [];
    for (const donor of nearbyDonors) {
      // Check 90 day eligibility
      let isEligible = true;
      if (donor.lastDonated) {
        const nextDate = new Date(new Date(donor.lastDonated).getTime() + 90 * 24 * 60 * 60 * 1000);
        if (new Date() < nextDate) isEligible = false;
      }

      if (isEligible) {
        const messageStr = `URGENT at ${hospitalName}: ${message}`;
        logs.push({
          fromUser: req.user._id,
          toDonor: donor._id,
          bloodGroup,
          message: messageStr,
          status: 'Pending'
        });

        notifications.push({
          userId: donor.userId,
          type: 'Broadcast',
          message: messageStr,
          referenceId: request._id
        });

        // Notify via Socket.IO if online
        if (req.userSockets && req.userSockets.has(donor.userId.toString())) {
          const socketId = req.userSockets.get(donor.userId.toString());
          req.io.to(socketId).emit("new_broadcast_request", {
            hospitalName,
            bloodGroup,
            urgency,
            address,
            message: messageStr
          });
        }
      }
    }

    if (logs.length > 0) {
      await RequestLog.insertMany(logs);
      await Notification.insertMany(notifications);
    }

    res.status(201).json({ message: "Broadcast sent successfully", donorsNotified: logs.length });
  } catch (error) {
    console.error("Broadcast error:", error);
    res.status(500).json({ error: "Failed to broadcast request." });
  }
};