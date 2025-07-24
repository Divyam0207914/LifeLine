import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700">
            Have questions, suggestions, or need help? We’re just a message away.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-pink-500 mb-2">Email</h2>
              <p className="text-gray-700">support@lifeline.org</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-pink-500 mb-2">Phone</h2>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-pink-500 mb-2">Office Address</h2>
              <p className="text-gray-700">123 LifeLine Avenue, Delhi, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message here..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-600 transition"
            >
              Send Message
            </button>
          </form>

        </div>

        {/* CTA Section */}
        <section className="text-center mt-8">
          <h3 className="text-xl font-semibold mb-2">Want to contribute more?</h3>
          <button
            onClick={() => window.location.href = "/donor-profile"}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
          >
            Become a Donor
          </button>
        </section>

      </div>
    </div>
  );
};

export default Contact;
