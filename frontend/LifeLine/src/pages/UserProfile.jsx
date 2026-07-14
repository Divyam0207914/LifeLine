import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";
import SkeletonLoader from "../components/SkeletonLoader";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("requests");
  const [donorData, setDonorData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDonorData = async () => {
    try {
      const res = await axiosInstance.get("/donor/me", {
        withCredentials: true,
      });
      console.log(user)
      setDonorData(res.data.donor);
    } catch (err) {
      console.log(err);
      setDonorData(null); // Not a donor
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await axiosInstance.get("/request-log/my-requests", {
        withCredentials: true,
      });
      setMyRequests(res.data || []);
    } catch (err) {
      console.error("Failed to load request history", err);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const res = await axiosInstance.get("/request-log/received-requests", {
        withCredentials: true,
      });
      console.log("Received tab data:", res.data);
      setReceivedRequests(res.data || []);
    } catch (err) {
      console.error("Failed to load received requests", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const loadAll = async () => {
        setLoading(true);
        await Promise.all([
          fetchDonorData(),
          fetchMyRequests(),
          fetchReceivedRequests()
        ]);
        setLoading(false);
      };
      loadAll();
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const res = await axiosInstance.get(
          "http://localhost:5005/api/request-log/received-requests",
          {
            withCredentials: true,
          }
        );
        console.log("Received tab data:", res.data); // <- ✅ this
        setReceivedRequests(res.data);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    if (activeTab === "received") {
      fetchReceivedRequests();
    }
  }, [activeTab]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-2xl">
          <SkeletonLoader className="w-48 h-10 mx-auto mb-8" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <SkeletonLoader className="w-64 h-6 mb-2" />
              <SkeletonLoader className="w-64 h-6 mb-2" />
              <SkeletonLoader className="w-48 h-6 mb-2" />
              <SkeletonLoader className="w-48 h-6" />
            </div>
            <SkeletonLoader className="w-28 h-28 rounded-full" />
          </div>
          <SkeletonLoader className="w-32 h-10 mx-auto mb-8" />
          <div className="flex space-x-4 mb-4">
            <SkeletonLoader className="w-32 h-10" />
            <SkeletonLoader className="w-40 h-10" />
          </div>
          <div className="space-y-4">
            <SkeletonLoader className="w-full h-16" />
            <SkeletonLoader className="w-full h-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-4xl p-8 sm:p-12 shadow-2xl rounded-3xl border border-gray-100">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Dashboard</span>
        </h2>

        {/* User Info + Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-pink-50 rounded-2xl p-8 mb-8 border border-pink-100">
          <div className="text-center sm:text-left order-2 sm:order-1 mt-6 sm:mt-0">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h3>
            <p className="text-lg text-gray-600 mb-6 flex items-center justify-center sm:justify-start gap-2">
              <span>📧</span> {user.email}
            </p>
            {donorData && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Total Donations</p>
                  <p className="text-2xl font-bold text-pink-600">{donorData.donationCount || 0}</p>
                </div>
                <div className="hidden sm:block w-px bg-gray-200"></div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Next Eligible</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {donorData.lastDonated
                      ? new Date(
                          new Date(donorData.lastDonated).getTime() +
                            90 * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .slice(0, 10)
                      : "Available Now"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="order-1 sm:order-2 w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-5xl shadow-xl border-4 border-white">
            {user.name[0].toUpperCase()}
          </div>
        </div>

        {/* CTA */}
        {!donorData && (
          <div className="text-center mb-10 bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-2xl shadow-lg text-white">
            <h3 className="text-2xl font-bold mb-3">Be a Hero Today!</h3>
            <p className="mb-6 opacity-90 text-lg">You haven't registered as a donor yet. Join the community to start saving lives.</p>
            <button
              onClick={() => navigate("/donor-profile")}
              className="bg-white text-pink-600 font-bold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition duration-300"
            >
              Register as Donor
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex space-x-2 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-6 py-3 font-semibold text-lg transition duration-300 ${
                activeTab === "requests"
                  ? "border-b-2 border-pink-500 text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Requests
            </button>
            <button
              onClick={() => setActiveTab("received")}
              className={`px-6 py-3 font-semibold text-lg transition duration-300 ${
                activeTab === "received"
                  ? "border-b-2 border-pink-500 text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Received Requests
            </button>
          </div>

          <div className="min-h-[200px]">
            {activeTab === "requests" ? (
              myRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <span className="text-4xl mb-4">📭</span>
                  <p className="text-lg">You have no active requests.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {myRequests.map((req) => (
                    <div key={req._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full text-sm">
                          {req.bloodGroup} Needed
                        </span>
                        <span className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mt-2">{req.message}</p>
                    </div>
                  ))}
                </div>
              )
            ) : receivedRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <span className="text-4xl mb-4">🙌</span>
                <p className="text-lg">You haven't received any blood requests.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {receivedRequests.map((req) => (
                  <div key={req._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md p-6 rounded-xl transition duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {req.fromUser?.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{req.fromUser?.name || "Unknown User"}</p>
                          <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full text-sm">
                        {req.bloodGroup}
                      </span>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{req.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-12 text-center border-t border-gray-100 pt-8">
          <button
            onClick={logout}
            className="text-gray-500 hover:text-red-500 font-medium transition duration-300 flex items-center justify-center mx-auto gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
