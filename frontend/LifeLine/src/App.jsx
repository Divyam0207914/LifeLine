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
function App() {
  return (
    <>
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
      </Routes>
      <Footer />
    </>
  )
}

export default App;
