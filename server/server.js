const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const {createPlayer, removePlayer, getListOfUsers} = require("./utils");
app.use(cors());
app.use(express.json());

/**
 * @fileoverview server file contains initiation of the server and the socket.
 * @package express, socket, cors.
 */

const server = app.listen("8000", () => {
  // starting the server by listening to port 8000
  console.log("Server Running on Port 8000...");
});

app.get("/users", (req, res) => {
  console.log(getListOfUsers())
  res.json({ "users": getListOfUsers() });
});

//initiating the socket
io = socket(server);

io.on("connection", (socket) => {
  /**
   * the socket starts to listen on the event connection to happen from the client side
   * when connected it takes socket object from the client
   */
  socket.on("join_room", (data, callback) => {
    socket.join(data.room);
    createPlayer(data.username, data.room)
    console.log("User Joined Room: " + data);
    console.log(getListOfUsers());
    socket.to(data.room).emit("welcome_message", getListOfUsers());
    callback({
      status: "ok",
      users: getListOfUsers()
    });
    
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", (data) => {
    removePlayer(data.username, data.room)
    console.log(getListOfUsers());
    socket.to(data.room).emit("welcome_message", getListOfUsers()); 
    console.log("USER DISCONNECTED");
  });
});
