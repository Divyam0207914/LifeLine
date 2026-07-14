import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SkeletonLoader from "../components/SkeletonLoader";

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
        const requestsRes = await axiosInstance.get("/request/my-requests", {
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
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center mb-6 gap-4">
          <SkeletonLoader className="w-16 h-16 rounded-full" />
          <SkeletonLoader className="w-40 h-8" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SkeletonLoader className="w-full h-6" />
          <SkeletonLoader className="w-full h-6" />
          <SkeletonLoader className="w-full h-6" />
          <SkeletonLoader className="w-full h-6" />
        </div>
      </div>
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white w-full max-w-4xl p-8 sm:p-12 shadow-2xl rounded-3xl border border-gray-100">
        
        <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 text-3xl shadow-inner">
            <FaUserCircle />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Donor <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Dashboard</span></h2>
            <p className="text-gray-500">Manage your availability and donation history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Blood Group</p>
            <p className="text-2xl font-bold text-red-600">{donor.bloodGroup}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Location</p>
            <p className="text-xl font-semibold text-gray-800">{donor.location}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Contact</p>
            <p className="text-xl font-semibold text-gray-800">{donor.contact}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Last Donated</p>
            <p className="text-xl font-semibold text-gray-800">{donor.lastDonated?.slice(0, 10) || "Never"}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 sm:p-8 rounded-2xl border border-pink-100 flex flex-col sm:flex-row items-center justify-between mb-10 shadow-sm">
          <div>
            <p className="text-gray-600 font-medium mb-1">Status & Eligibility</p>
            <div className="flex items-center gap-3">
              <span className={`flex w-3 h-3 rounded-full ${isEligible ? "bg-green-500" : "bg-red-500 animate-pulse"}`}></span>
              <span className={`text-xl font-bold ${isEligible ? "text-green-700" : "text-red-600"}`}>
                {isEligible ? "Eligible to Donate" : `Next Eligible: ${nextEligibleDate}`}
              </span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            {donor.availability ? (
              <button
                className="px-6 py-3 bg-white border-2 border-red-500 text-red-600 font-bold rounded-full hover:bg-red-50 hover:shadow-md transition duration-300 w-full sm:w-auto"
                onClick={async () => {
                  try {
                    await axiosInstance.put("/donor/toggle-availability");
                    setDonor({ ...donor, availability: false });
                  } catch (err) { alert(err.response?.data?.message || "Failed"); }
                }}
              >
                Go Offline
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg w-full sm:w-auto"
                disabled={new Date() < new Date(nextEligibleDate)}
                onClick={async () => {
                  try {
                    await axiosInstance.put("/donor/toggle-availability");
                    setDonor({ ...donor, availability: true });
                  } catch (err) { alert(err.response?.data?.message || "Failed"); }
                }}
              >
                Become Available
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex space-x-2 border-b border-gray-200 mb-6">
            <button
              className={`px-6 py-3 font-semibold text-lg transition duration-300 ${
                activeTab === "history"
                  ? "border-b-2 border-pink-500 text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Donation History
            </button>
            <button
              className={`px-6 py-3 font-semibold text-lg transition duration-300 ${
                activeTab === "requests"
                  ? "border-b-2 border-pink-500 text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              My Requests
            </button>
          </div>

          <div className="min-h-[200px]">
            {activeTab === "history" ? (
              donationHistory.length > 0 ? (
                <div className="grid gap-4">
                  {donationHistory.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300 flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Donated to</p>
                        <p className="text-lg font-bold text-gray-900">{item.recipientName}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full text-sm block mb-2">
                          {item.bloodGroup}
                        </span>
                        <p className="text-sm text-gray-500">{new Date(item.date).toDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <span className="text-4xl mb-4">🏆</span>
                  <p className="text-lg">No donation history yet. Your journey starts soon!</p>
                </div>
              )
            ) : myRequests.length > 0 ? (
              <div className="grid gap-4">
                {myRequests.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-sm">
                        {item.bloodGroup} Needed
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      {item.message ? <p className="text-gray-700 italic flex-1 mr-4">"{item.message}"</p> : <div></div>}
                      <p className="text-xs text-gray-400 font-semibold uppercase">{new Date(item.createdAt).toDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <span className="text-4xl mb-4">📭</span>
                <p className="text-lg">You haven't made any requests.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonorProfile;
