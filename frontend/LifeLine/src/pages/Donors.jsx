import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = "https://lifeline-backend-lcwo.onrender.com"; // Use .env in production

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/donor/all`);
        setDonors(response.data);
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
    const interval = setInterval(fetchDonors, 20000);
    return () => clearInterval(interval);
  }, []);

  const uniqueCities = [
    "All",
    ...new Set(donors.map((d) => d.location).filter(Boolean)),
  ];

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const filteredDonors = donors.filter((donor) => {
    const nameMatch = donor?.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const bloodMatch =
      selectedBlood === "All" || donor.bloodGroup === selectedBlood;

    const cityMatch = selectedCity === "All" || donor.location === selectedCity;

    return nameMatch && bloodMatch && cityMatch;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    const d = new Date(dateStr);
    return isNaN(d) ? "Invalid" : d.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
        💉 Available Donors
      </h1>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm"
        />

        <select
          value={selectedBlood}
          onChange={(e) => setSelectedBlood(e.target.value)}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm"
        >
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm"
        >
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 text-right">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-200 text-pink-800 font-semibold rounded-xl shadow hover:bg-pink-300 transition"
        >
          🔄 Refresh List
        </button>
      </div>

      {/* Donor Cards */}
      {loading ? (
        <p className="text-center text-gray-600">Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p className="text-center text-gray-500">
          No donors match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => {
            const lastDonated = donor?.lastDonated
              ? new Date(donor.lastDonated).toLocaleDateString()
              : "N/A";

            const today = new Date();
            let isEligible = donor?.availability;

            if (donor?.lastDonated) {
              const lastDonatedDate = new Date(donor.lastDonated);
              const nextEligibleDate = new Date(
                lastDonatedDate.getTime() + 90 * 24 * 60 * 60 * 1000
              );

              // If today is before next eligible date, they are not eligible
              isEligible = today >= nextEligibleDate && donor?.availability;
            }

            return (
              <div
                key={donor._id}
                className="border p-4 rounded-2xl shadow hover:shadow-md transition bg-white"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${donor?.userId?.name}&background=FFB6C1&color=fff&size=128`}
                    alt="avatar"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-pink-600">
                      {donor?.userId?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {donor?.userId?.email}
                    </p>
                  </div>
                </div>

                <p>
                  <strong>Blood Group:</strong>{" "}
                  <span className="text-red-600">{donor.bloodGroup}</span>
                </p>
                <p>
                  <strong>City:</strong> {donor.location || "Unknown"}
                </p>
                <p>
                  <strong>Last Donated:</strong> {lastDonated}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    isEligible ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {isEligible ? "✅ Eligible to Donate" : "❌ Not Eligible Yet"}
                </p>

                <button
                  onClick={() =>
                    navigate("/request", {
                      state: {
                        name: donor?.userId?.name,
                        bloodGroup: donor.bloodGroup,
                        location: donor.location,
                        contact: donor.contact,
                      },
                    })
                  }
                  className="mt-3 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                  disabled={!isEligible}
                >
                  {isEligible ? "Request Blood" : "Unavailable"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
