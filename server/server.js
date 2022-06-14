const express = require('express')
const app = express()
const cors = require("cors")
const socket = require("socket.io")
const {getListOfUsersByRoomId,
   getListOfRooms, createRoom, getRoomById, 
   removeRoomById, removePlayerFromRoom
  } = require("./utils");


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
    socket.username = data.username;
    socket.roomId = data.room;
    socket.join(data.room);
    
    const newUser = {id:data.id, username:data.username, room:data.room}
    const newRoom = createRoom(data.room, data.username, true, newUser);

    if(getRoomById(socket.roomId).players.length > 2){
      callback({
        status: "ROOM_FULL",
        room:getRoomById(socket.roomId)
      });
      return;
    }
    
    socket.to(socket.roomId).emit("welcome_message", getListOfUsersByRoomId(socket.roomId));
    callback({
      status: "ok",
      room:getRoomById(socket.roomId),
      users: getListOfUsersByRoomId(socket.roomId)
    });
    
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("close_room",(data)=>{
    if (!getRoomById(data.room)) return
    if(data.username == getRoomById(data.room).host){
      removeRoomById(data.room);
      socket.to(data.room).emit("receive_message", {
          room: data.room,
          content: {
            author: "Server",
            message:`${data.username}: Host closed the room`
          }
      });
    }


  })

  socket.on("remove_player",(data)=>{
    removePlayerFromRoom(data.id, data.username, data.room);
    socket.to(data.room).emit("welcome_message", getListOfUsersByRoomId(data.room));// send back the new list after removing a user
    getListOfUsersByRoomId(data.room) && getListOfUsersByRoomId(data.room).length <2 && socket.to(data.room).emit("receive_message", {
        room: data.room,
        content: {
          author: "Server",
          message:`${data.username}: has been disconnected from room`
        }
    });
  })
  socket.on("disconnect", () => {// if a client disconnected then remove the handshake from the sockets arrray
    socket.disconnect()
    console.log("USER DISCONNECTED");
  });
});