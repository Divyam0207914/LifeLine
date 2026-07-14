import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useSocket } from '../context/SocketContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const socket = useSocket();

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on('request_status_updated', fetchNotifications);
    socket.on('new_broadcast_request', fetchNotifications);
    return () => {
      socket.off('request_status_updated');
      socket.off('new_broadcast_request');
    };
  }, [socket, user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = async () => {
    try {
      await axiosInstance.put('/notifications/mark-all-read');
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

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
          <Link to="/broadcast" className="text-red-500 font-bold hover:text-red-600 transition duration-300">🚨 Emergency</Link>
        </nav>

        {/* Icons + Auth */}
        <div className="flex items-center gap-6 relative">
          {user ? (
            <>
              <div className="flex gap-6 text-xl text-gray-700 items-center">
                
                {/* Notification Bell */}
                <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                  <span className="text-2xl hover:text-pink-500 transition">🔔</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>

                {/* Notifications Dropdown */}
                {showDropdown && (
                  <div className="absolute top-12 right-10 w-80 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
                    <div className="p-3 bg-gray-50 flex justify-between items-center border-b border-gray-200">
                      <span className="font-bold text-gray-700 text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-pink-500 hover:underline">Mark all read</button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-gray-500 p-4 text-center">No notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n._id} className={`p-3 border-b text-sm ${n.isRead ? 'bg-white' : 'bg-pink-50'}`}>
                            <p className="text-gray-800">{n.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                <Link to="/profile" title="User Profile" className="hover:text-pink-500 transition duration-300 text-2xl">
                  👤
                </Link>
              </div>
              
              <button
                onClick={logout}
                className="text-gray-600 border border-gray-300 px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 transition ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-pink-500 border border-pink-500 px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-pink-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-pink-600 text-white px-4 py-1.5 text-sm font-medium rounded-lg hover:bg-pink-700 transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
