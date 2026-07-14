import RequestLog from '../models/requestLog.model.js';
import Donor from '../models/donor.model.js';
import Notification from '../models/notification.model.js';

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
      .sort({ createdAt: -1 })
      .lean();

    res.json(requests);
  } catch (error) {
    console.error('Error fetching received requests:', error);
    res.status(500).json({ message: 'Failed to fetch received requests.' });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    const requestLog = await RequestLog.findById(id).populate('fromUser', '_id name email');
    if (!requestLog) {
      return res.status(404).json({ message: 'Request log not found.' });
    }

    const donor = await Donor.findOne({ userId });
    if (!donor || donor._id.toString() !== requestLog.toDonor.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this request.' });
    }

    const validStatuses = ['Pending', 'Accepted', 'Travelling', 'Reached Hospital', 'Donation Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    requestLog.status = status;
    await requestLog.save();

    // Fire socket event and create notification to requester
    const notificationMessage = `Your request status has been updated to: ${status} by ${req.user.name}.`;
    await Notification.create({
      userId: requestLog.fromUser._id,
      type: 'StatusUpdate',
      message: notificationMessage,
      referenceId: requestLog._id
    });

    if (req.userSockets && req.userSockets.has(requestLog.fromUser._id.toString())) {
      const socketId = req.userSockets.get(requestLog.fromUser._id.toString());
      req.io.to(socketId).emit("request_status_updated", {
        requestId: requestLog._id,
        status: requestLog.status,
        donorName: req.user.name,
      });
    }

    res.json({ message: 'Status updated successfully.', requestLog });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status.' });
  }
};
