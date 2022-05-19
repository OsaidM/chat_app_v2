import React, { useState, useEffect, navigate } from "react";
import {Link} from "@reach/router"
import io from "socket.io-client";

const Chat = (props) => {
    const {room, name} = props;
    const [socket] = useState(()=> io(":8000"));
    // After Login
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);
    const [getCurrentUser, setCurrentUser] = useState({id:socket.id, username:name, room});
    
    useEffect(() => {
      if(!socket){
        
        navigate(`/`)
      }
      
      socket.on("connect", () => {
        console.log({id:socket.id, username:name, room});
        socket.emit("join_room", {id:socket.id, username:name, room},  (res) => {
          setUsers(res.users);
          setCurrentUser({id:socket.id, username:name, room})
        })
      });


      socket.on("welcome_message", (data) => {
        console.log(data);
        setUsers(data);
      });
      
      return () => {
        socket.emit("remove_player", {id:socket.id, username:name, room});
        socket.disconnect()
      };
    },[ socket, name, room]);
      

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
      setMessageList([...messageList, messageContent]);
      setMessage("");

    };
      
    return (
      <main>
        <aside>
          <h3>
            User's List
          </h3>
          <ul className="users-list">
            {users&& users.map((val, key)=>{
              return (
                <li key={key}>
                  - {val.username}
                </li>
              )
            })}
          </ul>
        </aside>
        <section>
          <div className="chat-container">
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    key = {key}
                    className="message-container"
                    id={
                      val.content.author === name ? "You"
                      : val.content.author === "Server"? "Server"
                      : "Other"
                      // val.author === name ? "You" : val.author === "server"? "server":"Other"
                    }
                  >
                    <div key = {key} className="messageIndividual">
                      {val.content.author === "Server" ? "":`${val.content.author}: `}
                      
                      {val.content.message} 
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="message-inputs">
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
          </div>
        </section>
        <Link to="/" style={{"width":"100px", "height":"20px"}}>Logout</Link>
      </main>
    )
}

export default Chat
