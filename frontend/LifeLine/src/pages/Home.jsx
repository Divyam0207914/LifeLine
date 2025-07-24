import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Home = () => {
  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="my-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Give Blood, <span className="text-pink-500">Save Lives</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Join the mission to make a difference. Every drop counts!
            </p>
            <div className="mt-6 space-x-4">
              <Link
                to="/donor-profile"
                className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
              >
                Become a Donor
              </Link>
              <Link
                to="/donors"
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-50 transition"
              >
                Find Donors
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <img
              src={assets.blood_img1}
              alt="blood donation"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </section>
      

      {/* How it Works */}
      {/* How it Works */}
<section className="my-20 px-6 mb-16">
  <h2 className="text-2xl font-semibold text-center mb-8">How it Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-6xl mx-auto">
    <div>
      <h3 className="text-xl font-bold text-pink-500">1. Register</h3>
      <p className="text-gray-600 mt-2">Create your profile as a donor.</p>
    </div>
    <div>
      <h3 className="text-xl font-bold text-pink-500">2. Donate</h3>
      <p className="text-gray-600 mt-2">Help people in need near you.</p>
    </div>
    <div>
      <h3 className="text-xl font-bold text-pink-500">3. Save Lives</h3>
      <p className="text-gray-600 mt-2">Make a difference that matters.</p>
    </div>
  </div>
</section>


      {/* Stats */}
      <section className="text-center mb-20 px-4">
  <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
  <div className="flex justify-center gap-8 flex-wrap text-pink-500 text-xl font-semibold">
    <p>👥 500+ Donors</p>
    <p>🩸 1000+ Requests Fulfilled</p>
    <p>💓 Countless Lives Saved</p>
  </div>
</section>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Blood Donation Matters
          </h2>
          <p className="text-gray-600 text-lg">
            Blood donation is one of the most noble and selfless acts. A single
            donation can save up to three lives. Whether it’s an accident
            victim, someone undergoing surgery, or a patient battling cancer —
            your donation matters. Join us and be a real-life hero.
          </p>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          What Donors Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[
            {
              name: "Ananya Verma",
              msg: "Donating blood was the best decision ever. The process was smooth and the feeling is unmatched!",
            },
            {
              name: "Ravi Mehra",
              msg: "I found a donor for my mom within hours. This platform is a real blessing.",
            },
            {
              name: "Neha Kapoor",
              msg: "The UI is clean and easy to use. Proud to be a part of this mission.",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="text-gray-700 italic">"{t.msg}"</p>
              <div className="mt-4 font-bold text-pink-500">- {t.name}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-pink-500 text-white py-10 mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Save Lives?</h2>
        <p className="mb-6">
          Join thousands of donors across India making a difference every day.
        </p>
        <Link
          to="/donor-profile"
          className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Become a Donor
        </Link>
      </section>
    </div>
  );
};

export default Home;
