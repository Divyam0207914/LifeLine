import React, { useState } from "react";
import axios from "axios";

const Request = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    bloodGroup: "",
    location: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRes = await axios.get("https://lifeline-backend-lcwo.onrender.com/api/user/me", {
        withCredentials: true,
      });

      const userId = userRes.data._id;

      await axios.post(
        "https://lifeline-backend-lcwo.onrender.com/api/request-log",
        {
          ...formData,
          requestedBy: userId,
        },
        { withCredentials: true }
      );

      setSuccess(true);
      setFormData({
        name: "",
        contact: "",
        bloodGroup: "",
        location: "",
        message: "",
      });
    } catch (err) {
        console.log(err)
      setError("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
        Request Blood via SMS
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 p-2 rounded-md"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 p-2 rounded-md"
        />

        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group (e.g., A+)"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 p-2 rounded-md"
        />

        <input
          type="text"
          name="location"
          placeholder="Your Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border border-pink-300 p-2 rounded-md"
        />

        <textarea
          name="message"
          placeholder="Additional Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-pink-300 p-2 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md"
        >
          Send Request
        </button>
      </form>

      {success && (
        <p className="text-green-600 text-center mt-4">
          ✅ Request sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center mt-4">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default Request;
