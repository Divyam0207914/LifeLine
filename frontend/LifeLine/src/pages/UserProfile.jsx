import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("requests");
  const [donorData, setDonorData] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchDonorData();
      fetchMyRequests();
      fetchReceivedRequests();
    }
  }, [navigate]);
  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const res = await axiosInstance.get(
          "https://lifeline-backend-lcwo.onrender.com/api/request-log/received-requests",
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          User Profile
        </h2>

        {/* User Info + Avatar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-1">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            {donorData && (
              <>
                <p className="text-lg text-gray-600">
                  <strong>Total Donations:</strong>{" "}
                  {donorData.donationCount || 0}
                </p>
                <p className="text-lg text-gray-600">
                  <strong>Next Eligible Date:</strong>{" "}
                  {donorData.lastDonated
                    ? new Date(
                        new Date(donorData.lastDonated).getTime() +
                          90 * 24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .slice(0, 10)
                    : "N/A"}
                </p>
              </>
            )}
          </div>

          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-3xl shadow-md">
            {user.name[0].toUpperCase()}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/donor-profile")}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Become a Donor
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-2 rounded ${
                activeTab === "requests"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              My Requests
            </button>
            <button
              onClick={() => setActiveTab("received")}
              className={`px-4 py-2 rounded ${
                activeTab === "received"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Received Requests
            </button>
          </div>

          {activeTab === "requests" ? (
            myRequests.length === 0 ? (
              <p className="text-gray-700">You have no active requests.</p>
            ) : (
              <ul className="text-gray-700 space-y-2">
                {myRequests.map((req) => (
                  <li key={req._id} className="bg-white shadow p-3 rounded">
                    <strong>{req.bloodGroup}</strong> requested on{" "}
                    {new Date(req.createdAt).toLocaleDateString()} -{" "}
                    {req.message}
                  </li>
                ))}
              </ul>
            )
          ) : receivedRequests.length === 0 ? (
            <p className="text-gray-700">
              You haven't received any blood requests.
            </p>
          ) : (
            <ul className="text-gray-700 space-y-2">
              {receivedRequests.map((req) => (
                <li key={req._id} className="bg-white shadow p-3 rounded">
                  <p>
                    <strong>From:</strong> {req.fromUser?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {req.bloodGroup}
                  </p>
                  <p>
                    <strong>Message:</strong> {req.message}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
