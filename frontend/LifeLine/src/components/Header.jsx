import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:text-pink-500 transition duration-300">
            LifeLine<span className="text-pink-500">.</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-pink-500 transition duration-300">Home</Link>
          <Link to="/donors" className="hover:text-pink-500 transition duration-300">Donors</Link>
          <Link to="/about" className="hover:text-pink-500 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-pink-500 transition duration-300">Contact</Link>
          <Link to="/donor-profile" className="hover:text-pink-500 transition duration-300">Donate Blood</Link>
        </nav>

        {/* Icons + Auth */}
        <div className="flex items-center gap-6">
          {/* Icons */}
          <div className="flex gap-4 text-xl text-gray-700">
            {/* <Link to="/search" title="Search Donor" className="hover:text-pink-500 transition duration-300">
              <i className="fas fa-search" />
            </Link> */}
            <Link to="/profile" title="User Profile" className="hover:text-pink-500 transition duration-300">
              <i className="fas fa-user" />
            </Link>
            {/* <Link to="/my-requests" title="My Requests" className="hover:text-pink-500 transition duration-300">
              <i className="fas fa-history" />
            </Link> */}
          </div>

          {/* Login / Register */}
          <div className="flex gap-3">
            <Link
              to="/login"
              className="text-pink-500 border border-pink-500 px-4 py-1 rounded hover:bg-pink-500 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
