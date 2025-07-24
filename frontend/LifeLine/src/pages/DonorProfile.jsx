import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const DonorProfile = () => {
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const [donationHistory, setDonationHistory] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/donor/me", {
          withCredentials: true,
        });
        setDonor(res.data.donor);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch donor profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchHistoryAndRequests = async () => {
      try {
        const historyRes = await axiosInstance.get("/donor/history", {
          withCredentials: true,
        });
        const requestsRes = await axiosInstance.get("/request-log/my-requests", {
          withCredentials: true,
        });

        setDonationHistory(historyRes.data || []);
        setMyRequests(requestsRes.data || []);
      } catch (err) {
        console.error("Error loading history/requests", err);
      }
    };

    fetchHistoryAndRequests();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading donor profile...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );
  if (!donor)
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10 text-center">
        <p className="mb-4 text-lg">You are not registered as a donor yet.</p>
        <button
          onClick={() => navigate("/donate")}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          Become a Donor
        </button>
      </div>
    );

  let nextEligibleDate = "N/A";
  let isEligible = donor.availability;

  if (donor.lastDonated) {
    const lastDate = new Date(donor.lastDonated);
    const nextDate = new Date(lastDate.getTime() + 90 * 24 * 60 * 60 * 1000);
    nextEligibleDate = nextDate.toISOString().slice(0, 10);
    isEligible = new Date() >= nextDate && donor.availability;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-6 gap-4">
        <FaUserCircle className="text-6xl text-pink-500" />
        <div>
          <h2 className="text-2xl font-bold text-pink-600">My Profile</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Blood Group:</strong> {donor.bloodGroup}
        </div>
        <div>
          <strong>Location:</strong> {donor.location}
        </div>
        <div>
          <strong>Contact:</strong> {donor.contact}
        </div>
        <div>
          <strong>Last Donated:</strong> {donor.lastDonated?.slice(0, 10) || "N/A"}
        </div>
        <div>
          <strong>Next Eligible Date:</strong> {nextEligibleDate}
        </div>
        <div className="flex items-center gap-4 mb-6">
          <strong>Eligibility:</strong>
          <span className={`font-semibold ${isEligible ? "text-green-600" : "text-red-500"}`}>
            {isEligible ? "✅ Eligible to Donate" : "❌ Not Eligible Yet"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded font-semibold ${activeTab === "history" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700"}`}
          onClick={() => setActiveTab("history")}
        >
          Donation History
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${activeTab === "requests" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700"}`}
          onClick={() => setActiveTab("requests")}
        >
          My Requests
        </button>
      </div>

      <div className="bg-pink-50 p-4 rounded-md text-gray-600">
        {activeTab === "history" ? (
          donationHistory.length > 0 ? (
            donationHistory.map((item, index) => (
              <div key={index} className="mb-2">
                <p>Donated to: {item.recipientName} ({item.bloodGroup})</p>
                <p>Date: {new Date(item.date).toDateString()}</p>
              </div>
            ))
          ) : (
            <p>No donation history yet.</p>
          )
        ) : myRequests.length > 0 ? (
          myRequests.map((item, index) => (
            <div key={index} className="mb-2">
              <p>Requested for: {item.bloodGroup}</p>
              <p>Status: {item.status}</p>
              <p>Date: {new Date(item.createdAt).toDateString()}</p>
              {item.message && <p>Message: {item.message}</p>}
            </div>
          ))
        ) : (
          <p>You haven't made any requests.</p>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
