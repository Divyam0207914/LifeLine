import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [maxDistance, setMaxDistance] = useState(50000); // 50km default
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;
  
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        bloodGroup: selectedBlood !== "All" ? selectedBlood : undefined,
        city: selectedCity !== "All" ? selectedCity : undefined,
      };

      if (location.latitude && location.longitude) {
        params.latitude = location.latitude;
        params.longitude = location.longitude;
        params.maxDistance = maxDistance;
      }

      const response = await axiosInstance.get("/donor/all", { params });
      setDonors(response.data.donors || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch donors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [page, selectedBlood, selectedCity, location.latitude, location.longitude, maxDistance]);

  const uniqueCities = [
    "All",
    ...new Set(donors.map((d) => d.location).filter(Boolean)),
  ];

  const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const distanceOptions = [
    { label: "Any Distance (or Location Denied)", value: 50000000 },
    { label: "Within 5 km", value: 5000 },
    { label: "Within 10 km", value: 10000 },
    { label: "Within 20 km", value: 20000 },
    { label: "Within 50 km", value: 50000 },
  ];

  const filteredDonors = donors.filter((donor) => {
    const nameMatch = donor?.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    return nameMatch; // API already filters bloodGroup and city
  });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  };

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
        />

        <select
          value={selectedBlood}
          onChange={(e) => { setSelectedBlood(e.target.value); setPage(1); }}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
        >
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => { setSelectedCity(e.target.value); setPage(1); }}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
        >
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={maxDistance}
          onChange={(e) => { setMaxDistance(parseInt(e.target.value)); setPage(1); }}
          className="w-full p-3 border border-pink-200 rounded-lg shadow-sm disabled:opacity-50 focus:ring-2 focus:ring-pink-400"
          disabled={!location.latitude}
        >
          {distanceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="text-sm font-medium">
          {location.latitude ? (
            <span className="text-green-600 flex items-center gap-2">📍 Location Active (Radius Search Enabled)</span>
          ) : (
            <span className="text-yellow-600 flex items-center gap-2">⚠️ Location Denied (Showing all available)</span>
          )}
        </div>
        <button
          onClick={() => fetchDonors()}
          className="px-4 py-2 bg-pink-100 text-pink-700 font-semibold rounded-lg shadow-sm hover:bg-pink-200 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Donor Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="border border-pink-100 p-4 rounded-2xl shadow-sm bg-gray-50 animate-pulse h-64"></div>
           ))}
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center py-16 bg-pink-50 rounded-2xl border border-pink-100">
          <p className="text-gray-500 text-lg mb-2">No donors match your filters.</p>
          <button onClick={() => { setSelectedBlood("All"); setSelectedCity("All"); setSearch(""); setMaxDistance(50000000); }} className="text-pink-500 font-medium hover:underline">Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => {
              const lastDonated = formatDate(donor.lastDonated);
              const today = new Date();
              let isEligible = donor?.availability;

              if (donor?.lastDonated) {
                const lastDonatedDate = new Date(donor.lastDonated);
                const nextEligibleDate = new Date(
                  lastDonatedDate.getTime() + 90 * 24 * 60 * 60 * 1000
                );
                isEligible = today >= nextEligibleDate && donor?.availability;
              }

              let distanceText = null;
              if (location.latitude && donor.coordinates && donor.coordinates.coordinates) {
                const [dLon, dLat] = donor.coordinates.coordinates;
                if (dLat !== 0 && dLon !== 0) {
                  const dist = calculateDistance(location.latitude, location.longitude, dLat, dLon);
                  distanceText = `${dist.toFixed(1)} km away`;
                }
              }

              return (
                <div
                  key={donor._id}
                  className="border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between relative"
                >
                  {distanceText && (
                    <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">
                      📍 {distanceText}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-4 mb-4 mt-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${donor?.userId?.name}&background=FFB6C1&color=fff&size=128`}
                        alt="avatar"
                        className="w-12 h-12 rounded-full ring-2 ring-pink-100"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 pr-16">
                          {donor?.userId?.name}
                        </h2>
                        <p className="text-xs text-gray-500 truncate w-32 sm:w-40 md:w-48">
                          {donor?.userId?.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p className="flex justify-between">
                        <strong className="text-gray-700">Blood Group:</strong>{" "}
                        <span className="text-red-600 font-bold bg-red-50 px-2 rounded-full">{donor.bloodGroup}</span>
                      </p>
                      <p className="flex justify-between">
                        <strong className="text-gray-700">City:</strong> <span>{donor.location || "Unknown"}</span>
                      </p>
                      <p className="flex justify-between">
                        <strong className="text-gray-700">Last Donated:</strong> <span>{lastDonated}</span>
                      </p>
                    </div>
                    
                    <div className={`mt-2 p-2 rounded-lg text-center text-sm font-semibold ${
                        isEligible ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500 border border-gray-200"
                      }`}
                    >
                      {isEligible ? "✅ Eligible to Donate" : "⏳ Not Eligible Yet"}
                    </div>
                  </div>

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
                    className="mt-4 w-full px-4 py-2.5 bg-pink-500 text-white font-medium rounded-xl hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isEligible}
                  >
                    {isEligible ? "Request Blood" : "Unavailable"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
              >
                Previous
              </button>
              <span className="px-4 py-2 font-medium text-pink-600 bg-pink-50 rounded-lg">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
