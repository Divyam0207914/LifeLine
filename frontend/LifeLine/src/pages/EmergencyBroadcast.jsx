import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function EmergencyBroadcast() {
  const [form, setForm] = useState({
    bloodGroup: "A+",
    hospitalName: "",
    address: "",
    urgency: "High",
    message: "",
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencies = ["Low", "Medium", "High", "Critical"];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation denied or failed.", error);
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        latitude: location.latitude,
        longitude: location.longitude,
        maxDistance: 50000, // 50km broadcast radius
      };

      const res = await axiosInstance.post("/request/broadcast", payload);
      setSuccess(`Broadcast sent! Notified ${res.data.donorsNotified} eligible donors nearby.`);
      setForm({
        bloodGroup: "A+",
        hospitalName: "",
        address: "",
        urgency: "High",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send broadcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-red-100">
      <h2 className="text-3xl font-bold mb-2 text-center text-red-600 flex items-center justify-center gap-2">
        🚨 Emergency Broadcast
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Notify all eligible nearby donors immediately.
      </p>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
            <select
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {urgencies.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={form.hospitalName}
            onChange={handleChange}
            placeholder="e.g. Apollo Hospital"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Address / Location</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Ward 5, Room 302, Sector 14..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Any other details (e.g., patient condition, contact info)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 h-24"
          />
        </div>

        {!location.latitude && (
          <p className="text-sm text-yellow-600 mb-2">
            ⚠️ Warning: Location access denied. Broadcast will be sent to all online donors regardless of distance.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg disabled:opacity-50"
        >
          {loading ? "Broadcasting..." : "📢 Send Emergency Broadcast"}
        </button>
      </form>
    </div>
  );
}
