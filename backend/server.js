import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import router from './routes/user.routes.js';
import donorRoutes from './routes/donor.routes.js';
import cookieParser from "cookie-parser";
import requestRoutes from "./routes/request.routes.js";
import requestLogRoutes from './routes/request-log.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
origin: 'http://localhost:5173', // your frontend's origin
credentials: true, // Allow cookies/headers
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/user', router);
app.use('/api/donor', donorRoutes);
app.use("/api/request-log", requestRoutes);
app.use('/request-log', requestLogRoutes);
// Start server
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});




