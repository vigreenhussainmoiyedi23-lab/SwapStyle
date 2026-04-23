require("dotenv").config()

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
const { getDataFromToken } = require("./src/utils/jsonwebtoken.js");
const userModel = require("./src/models/user/user.model.js");
const PORT = process.env.PORT || 3000;

connectDB();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cookie: true
});


io.use((socket,next)=>{
  const token=socket.handshake.headers.cookie
  console.log(token)
  next()
})
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  console.log("socket.user", socket.user);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});