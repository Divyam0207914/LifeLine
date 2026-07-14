import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect if user is logged in
    const userString = localStorage.getItem("user");
    if (!userString) return;

    try {
      const user = JSON.parse(userString);
      const newSocket = io("https://lifeline-backend-lcwo.onrender.com", {
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
        newSocket.emit("register_user", user.id); // Assuming user object has id
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } catch (e) {
      console.error("Failed to parse user for socket connection", e);
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
