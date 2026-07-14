import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-pink-50 to-white">
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Give Blood, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Save Lives</span>
            </h1>
            <p className="text-gray-600 mt-6 text-xl max-w-2xl mx-auto lg:mx-0">
              Join the mission to make a difference. Every drop counts! Your contribution can give someone a second chance at life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/donor-profile"
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1 transition duration-300 text-center text-lg"
              >
                Become a Donor
              </Link>
              <Link
                to="/donors"
                className="bg-white border-2 border-pink-500 text-pink-600 font-semibold px-8 py-4 rounded-full shadow-md hover:bg-pink-50 hover:-translate-y-1 transition duration-300 text-center text-lg"
              >
                Find Donors
              </Link>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-rose-100 rounded-full blur-3xl opacity-50"></div>
            <img
              src={assets.blood_img1}
              alt="blood donation"
              className="relative rounded-2xl shadow-2xl w-full max-w-lg object-cover border-4 border-white transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { title: "1. Register", desc: "Create your profile as a donor in just a few clicks.", icon: "📝" },
              { title: "2. Donate", desc: "Help people in need near your location when emergencies arise.", icon: "🩸" },
              { title: "3. Save Lives", desc: "Make a difference that matters and become a real-life hero.", icon: "❤️" }
            ].map((step, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition duration-300">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-500 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 via-gray-900 to-gray-900"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl font-semibold mb-12 text-pink-400">Our Impact</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 font-bold">
            <div className="flex flex-col items-center">
              <span className="text-5xl lg:text-6xl text-white mb-2">500+</span>
              <span className="text-gray-400 text-xl">Active Donors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl lg:text-6xl text-white mb-2">1000+</span>
              <span className="text-gray-400 text-xl">Requests Fulfilled</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl lg:text-6xl text-pink-500 mb-2">Countless</span>
              <span className="text-gray-400 text-xl">Lives Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What Our Heroes Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ananya Verma", msg: "Donating blood was the best decision ever. The process was smooth and the feeling is unmatched!" },
              { name: "Ravi Mehra", msg: "I found a donor for my mom within hours. This platform is a real blessing in times of need." },
              { name: "Neha Kapoor", msg: "The UI is clean and easy to use. Proud to be a part of this mission to save lives." },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border border-pink-100 relative">
                <div className="text-4xl text-pink-300 absolute top-4 right-6 font-serif">"</div>
                <p className="text-gray-700 italic text-lg relative z-10 leading-relaxed mb-6">"{t.msg}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                    {t.name[0]}
                  </div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-pink-600 to-rose-500 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-10 text-pink-100">
            Join thousands of donors across India making a difference every day. Your single act of kindness can save up to 3 lives.
          </p>
          <Link
            to="/donor-profile"
            className="inline-block bg-white text-pink-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 text-lg"
          >
            Become a Donor Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
