const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let locations = {};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.username = username;
  });

  socket.on("locationUpdate", (data) => {
    locations[data.username] = data;
    io.emit("locations", locations);
  });

  socket.on("leave", (username) => {
    delete locations[username];
    socket.broadcast.emit("userLeft", username);
  });
});

server.listen(3000);
