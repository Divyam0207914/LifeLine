# ❤️ LifeLink – Smart Blood Donation & Emergency Response Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

*A modern full-stack blood donation platform that connects nearby donors with recipients during emergencies using real-time communication and geospatial search.*

</div>

---

# 📌 Overview

LifeLink is a modern MERN Stack application designed to simplify emergency blood donation by connecting recipients with nearby eligible donors.

The platform provides secure authentication, intelligent donor discovery, emergency broadcast requests, real-time notifications, donor eligibility tracking, and request lifecycle management to improve the speed and reliability of blood donation during emergencies.

---

# ✨ Features

## 👤 Authentication

- Secure JWT Authentication
- Role-Based Access Control
- Protected Routes
- User Profiles
- Persistent Login

---

## ❤️ Donor Management

- Register as a Blood Donor
- Update Donor Profile
- Toggle Donor Availability
- Donation Eligibility Tracking
- Donation History

---

## 📍 Smart Nearby Donor Search

- Browser Geolocation API
- MongoDB GeoJSON Storage
- 2dsphere Geospatial Queries
- Distance-based Search
- Radius Filters (5km / 10km / 20km / 50km)
- Blood Group Filtering
- Availability Filtering

---

## 🚨 Emergency Blood Requests

Recipients can

- Create Emergency Requests
- Broadcast Requests
- Track Request Status
- View Request History

---

## 🔔 Real-Time Notifications

Powered by Socket.IO

- Instant Blood Requests
- Emergency Broadcast Alerts
- Request Acceptance Updates
- Donation Completion Updates
- Live Availability Changes

---

## 📊 Request Lifecycle

Every request progresses through multiple stages:

```
Pending
      ↓
Accepted
      ↓
Travelling
      ↓
Reached Hospital
      ↓
Donation Completed
```

---

## 📈 Dashboard

### Donor Dashboard

- Profile Information
- Availability Status
- Eligibility Status
- Pending Requests
- Donation History
- Notification Center

### Recipient Dashboard

- Active Requests
- Nearby Donors
- Broadcast History
- Request Timeline
- Notifications

---

## 🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet Security Headers
- Express Rate Limiting
- Input Validation
- Protected APIs
- Secure Cookies Support

---

## ⚡ Performance Optimizations

- Server-side Pagination
- Optimized MongoDB Queries
- Lean Queries
- Geospatial Indexing
- Efficient API Responses

---

# 🏗 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt
- Express Validator

---

# 📂 Project Structure

```
LifeLink
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── context
│   ├── utils
│   └── App.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/LifeLink.git

cd LifeLink
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙ Environment Variables

Backend

```env
PORT=

MONGO_URL=

JWT_SECRET=
```

---

# 📡 API Modules

### Authentication

- Register
- Login
- Get Profile

---

### Donor

- Create Donor
- Update Donor
- Toggle Availability
- Nearby Search

---

### Requests

- Create Request
- Emergency Broadcast
- Accept Request
- Complete Donation
- Request History

---

# 🗄 Database Models

- User
- Donor
- Request
- RequestLog
- Notification

---

# 🎯 Future Improvements

- Push Notifications
- Hospital Portal
- Blood Bank Integration
- Email Alerts
- Admin Dashboard
- Donation Analytics
- Mobile Application

---

# 📸 Screenshots

> Add screenshots of:

- Landing Page
- Dashboard
- Nearby Donors
- Emergency Broadcast
- Notifications
- Donor Profile

---

# 💼 Resume Highlights

- Built a production-ready MERN application with geospatial donor discovery using MongoDB GeoJSON and 2dsphere indexing.
- Developed a real-time emergency blood request system with Socket.IO enabling instant notifications and request lifecycle management.
- Improved scalability and security using JWT authentication, role-based access control, pagination, validation, and optimized backend APIs.

---

# 👨‍💻 Author

**Divyam Saraf**

- GitHub: https://github.com/Divyam0207914
- LinkedIn: *(Add your LinkedIn URL)*

---

## ⭐ If you found this project useful, consider giving it a star!