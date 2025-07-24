const Footer = () => {
  return (
    <footer className="bg-white border-t pt-10 px-6 pb-4 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Logo + Desc */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            LifeLine<span className="text-pink-500">.</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
            Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">COMPANY</h2>
          <ul className="text-gray-600 space-y-1">
            <li><a href="#" className="hover:text-pink-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-pink-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Donate</a></li>
            <li><a href="#" className="hover:text-pink-500 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">GET IN TOUCH</h2>
          <p className="text-gray-600">+1-212-456-7890</p>
          <p className="text-gray-600">contact@foreveryou.com</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
        CopyRight 2024© forever.com - ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
