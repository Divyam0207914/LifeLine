import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donors from "./pages/Donors";
import DonorProfile from "./pages/DonorProfile";
import Donate from "./pages/Donate";
import Request from "./pages/Request";
import EmergencyBroadcast from "./pages/EmergencyBroadcast";
import { useEffect, useState } from "react";
import { useSocket } from "./context/SocketContext";
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    
    socket.on("new_broadcast_request", (data) => {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg text-red-600 flex justify-between items-center">
            🚨 URGENT: Blood Required 
            <button onClick={() => toast.dismiss(t.id)} className="text-gray-400 hover:text-gray-600 text-sm">✖</button>
          </h3>
          <p className="text-sm text-gray-800"><strong>Blood Group:</strong> {data.bloodGroup}</p>
          <p className="text-sm text-gray-800"><strong>Hospital:</strong> {data.hospitalName}</p>
          <p className="text-sm text-gray-800"><strong>Urgency:</strong> {data.urgency}</p>
        </div>
      ), { duration: 15000, style: { border: '1px solid #fca5a5', padding: '16px' } });
    });

    socket.on("request_status_updated", (data) => {
      toast.success(`Request Status Updated to: ${data.status} by ${data.donorName}`, { duration: 5000 });
    });

    return () => {
      socket.off("new_broadcast_request");
      socket.off("request_status_updated");
    };
  }, [socket]);

  return (
    <div className="relative">
      <Toaster position="top-right" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/profile" element={<UserProfile />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/donors" element={<Donors />} />
         <Route path="/donor-profile" element={<DonorProfile />} />
         <Route path="/donate" element={<Donate />} />
         <Route path="/request" element={<Request />} />
         <Route path="/broadcast" element={<EmergencyBroadcast />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
