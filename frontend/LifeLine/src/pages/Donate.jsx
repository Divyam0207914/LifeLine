import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const Donate = () => {
  const [form, setForm] = useState({
    bloodGroup: "",
    location: "",
    contact: "",
    lastDonated: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/donor/create", form, {
        withCredentials: true,
      });
      console.log("Success:", res.data);
      navigate("/donor-profile");
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
        Register as a Donor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md text-gray-700"
          required
        >
          <option value="" disabled>
            Select Blood Group
          </option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Enter your Location"
          value={form.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Enter your Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          pattern="[0-9]{10}"
          title="Enter a valid 10-digit phone number"
          required
        />

        <input
          type="date"
          name="lastDonated"
          value={form.lastDonated}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Date of Last Donation"
          max={new Date().toISOString().split("T")[0]} // prevent future date
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Donate;
