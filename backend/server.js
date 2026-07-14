import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/user.routes.js";
import donorRoutes from "./routes/donor.routes.js";
import cookieParser from "cookie-parser";
import requestRoutes from "./routes/request.routes.js";
import requestLogRoutes from "./routes/request-log.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();
 
const app = express();
const  PORT =  process.env.PORT || 5005  || " https://lifeline-backend-lcwo.onrender.com ";

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: [
    "https://lifeline-vert.vercel.app",
    "http://localhost:5173",
  ],// your frontend's origin
  credentials: true, // Allow cookies/headers
};

const io = new Server(server, {
  cors: corsOptions,
});

const userSockets = new Map();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  
  socket.on("register_user", (userId) => {
    userSockets.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.userSockets = userSockets;
  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Security Middlewares
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", apiLimiter);

// Routes
app.use("/api/user", router);
app.use("/api/donor", donorRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/request-log", requestLogRoutes);
app.use("/api/notifications", notificationRoutes);
// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
