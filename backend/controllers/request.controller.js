import Request from '../models/request.model.js';
export const getUserRequests = async (req, res) => {
    try {
        const requests = await Request.find({ requestedBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch request history" });
    }
};



import RequestLog from '../models/request.model.js';
export const getReceivedRequests = async (req, res) => {
  try {
    const donorId = req.user._id;

    const receivedRequests = await RequestLog.find({ toDonor: donorId })
      .populate("fromUser", "name email") // populating sender info
      .sort({ createdAt: -1 });

    res.json(receivedRequests);
  } catch (error) {
    console.error("Error fetching received requests:", error);
    res.status(500).json({ message: "Failed to fetch received requests." });
  }
};