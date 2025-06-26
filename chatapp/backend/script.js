const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Create express app and enable CORS so frontend can connect
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server and allow CORS from frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Your React app URL
    methods: ["GET", "POST"],
  },
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a client sends a message, broadcast it to all clients
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  // Log disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server on port 5000
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
