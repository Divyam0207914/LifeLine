const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Hero Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">About Lifeline</h1>
          <p className="text-lg text-gray-700">
            Connecting donors and recipients with compassion, speed, and trust.
          </p>
        </div>

        {/* Section: Mission */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-pink-500 mb-3">Our Mission</h2>
          <p>
            At Lifeline, our mission is simple — save lives by creating a seamless platform
            where individuals in need of blood can easily connect with willing donors in real-time.
          </p>
        </section>

        {/* Section: Why Blood Donation Matters */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-pink-500 mb-3">Why Blood Donation Matters</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Every 2 seconds, someone in India needs blood.</li>
            <li>1 pint of blood can save up to 3 lives.</li>
            <li>Voluntary donation is the safest source of blood.</li>
          </ul>
        </section>

        {/* Section: How We Work */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-pink-500 mb-3">How It Works</h2>
          <p>
            Donors register and list their availability. Patients or hospitals raise requests, 
            and based on location, blood group, and urgency — our system finds the best match. 
            We notify donors and connect them to save lives.
          </p>
        </section>

        {/* Section: Impact Snapshot */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-pink-500 mb-3">Our Impact So Far</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-pink-600">250+</p>
              <p className="text-gray-600">Donors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-600">100+</p>
              <p className="text-gray-600">Requests Fulfilled</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-600">15+</p>
              <p className="text-gray-600">Cities Covered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-pink-600">∞</p>
              <p className="text-gray-600">Lives Touched</p>
            </div>
          </div>
        </section>

        {/* Section: Call to Action */}
        <section className="text-center mt-8">
          <h3 className="text-xl font-semibold mb-2">Ready to make a difference?</h3>
          <button
            onClick={() => window.location.href = "/donor-profile"}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
          >
            Join as a Donor
          </button>
        </section>

      </div>
    </div>
  );
};

export default About;
