const express = require('express')
const app = express()
const cors = require("cors")
const socket = require("socket.io")
const {createPlayer, removePlayer, getListOfUsers} = require("./utils");
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())
app.use(express.json())
const server = app.listen("8000", () => {
  console.log(`Example app listening at http://localhost:8000`)
})


//initiating the socket
const io = socket(server,{
  cors:{
    origin:true,
    credentials:true
  }
});

io.on("connection", (socket) => {
  /**
   * the socket starts to listen on the event connection to happen from the client side
   * when connected it takes socket object from the client
   */
  socket.on("join_room", (data, callback) => {
    socket.join(data.room);
    createPlayer(data.id, data.username, data.room)
    console.log("User Joined Room: " + data);
    console.log(getListOfUsers());
    socket.to(data.room).emit("welcome_message", getListOfUsers());
    callback({
      status: "ok",
      users: getListOfUsers()
    });
    
  });

  socket.on("send_message", (data) => {
    console.log(data); // shows message recieved from client
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("remove_player",(data)=>{
    console.log("Id before removing: ", data.id);// shows the new list
    removePlayer(data.id, data.username, data.room);
    socket.to(data.room).emit("welcome_message", getListOfUsers());// send back the new list after removing a user
    console.log("after removing: ", getListOfUsers());// shows the new list
    
    socket.to(data.room).emit("receive_message", {
        room: data.room,
        content: {
          author: "Server",
          message:`${data.username}: has been disconnected from room`
        }
    });
  })
  socket.on("disconnect", (data) => {// if a client disconnected then remove the handshake from the sockets arrray
    socket.disconnect()
    console.log("USER DISCONNECTED");
  });
});