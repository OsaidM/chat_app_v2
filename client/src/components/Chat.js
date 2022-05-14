import React, { useState, useEffect } from "react";
import axios from 'axios';
import io from "socket.io-client";
const Chat = (props) => {
    const {room, name} = props;
    const [socket] = useState(()=>io(":8000"));
    // After Login
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn]= useState(false);

    useEffect(() => {
      socket.emit("join_room", {username:name, room},  (res) => {
        console.log("inside the emit", res.status);
        setUsers(res.users);
      })
      socket.on("welcome_message", (data) => {
        console.log(data);
        
        setUsers(data);
      });
      
      return () => {
        socket.off();
        socket.on("disconnect", {username:name, room});
        socket.disconnect(true)};
    },[socket, name, room]);
      

    socket.on("receive_message", (data) => {
        setMessageList([...messageList, data]);
    });

    const sendMessage = async () => {
      if(message.length<1){// to ensure the input field is not empty and at least 1 letter inside.
        return
      }
      let messageContent = {
        room: room,
        content: {
          author: name,
          message: message,
        },
      };
      await socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage("");

    };
      console.log("these usersssss",users)
    return (
      <main>
        <aside>
          <h3>
            User's List
          </h3>
            {users&& users.map((val, key)=>{
              console.log(users)
              return (
                <div key={key}>
                  - {val.username}
                </div>
              )
            })}
        </aside>
        <section>
          <div className="chatContainer">
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    key = {key}
                    className="messageContainer"
                    id={val.author === name ? "You" : "Other"}
                  >
                    <div key = {key} className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </section>
      </main>
    )
}

export default Chat
