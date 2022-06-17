import React, { useState, useEffect } from "react";
import "./style_chat.css"
import {Link, navigate} from "@reach/router"
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
        socket.on("connect", () => {
          console.log({id:socket.id, username:name, room});
          socket.emit("join_room", {id:socket.id, username:name, room},  (res) => {
            if(res.status === "ROOM_FULL"){
              return navigate("/")
            }
            setUsers(res.users);
            setCurrentUser({id:socket.id, username:name, room})
          })
        });
  
  
        socket.on("welcome_message", (data) => {
          console.log(data);
          setUsers(data);
        });
        window.addEventListener("beforeunload", e=>{
          socket.emit("remove_player", {id:socket.id, username:name, room});
          socket.disconnect()
          e.returnValue = `Are you Sure you want to leave?`;
        });
        return () => {
          socket.emit("remove_player", {id:socket.id, username:name, room});
          socket.disconnect()
        };
      },[ socket, name, room]);
        
  
      socket.on("receive_message", (data) => {
          setMessageList([...messageList, data]);
      });
  
      const sendMessage = async (e) => {
        e.preventDefault();
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
      
      const closeRoom = async()=>{
        await socket.emit("close_room", getCurrentUser);
  
        navigate("/")
      }

  return (
    <main>
        <section className="chat-section">
            <h1 className="chat-h">Welcome {name}</h1>
            <header className="chat-header"></header>
            <div className="chat-content">
                <div className="left">
                    <div className="left-header">
                        <div className="chat-button-rounds logout-shadow">
                            <div className="chat-button logout" onClick={()=>closeRoom()}>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                    <div className="left-body">
                        <div className="header">
                            <div className="panel-header-text">
                                {room}
                            </div>
                        </div>
                            
                        <ul>
                            {users&& users.map((val, key)=>{
                            return (
                                <li key={key}>
                                - {val.username}
                                </li>
                            )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <div className="chat-box">
                    {messageList.map((val, idx) => {
                        return (
                        <>
                        {
                        "content" in val &&
                            <div
                            key={idx}
                            className={
                            val.content.author === name ? "row-right"
                            : val.content.author === "Server"? "Server"
                            : "row-left"
                            }
                            >
                                <div key={idx} className={
                                  val.content.author === name ?"box3 sb13 box-position-right"
                                  :
                                  val.content.author === "Server"?""
                                  : "box3 box4 sb14 box-position-left"
                                  }>
                                    {val.content.author === "Server" ? "":`${val.content.author}: `}
                                    
                                    {val.content.message} 
                                </div>
                            </div>
                        }
                        </>
                        );
                    })}
                    </div>
                    <div className="chat-controls">
                      <form onSubmit={sendMessage}>
                        <div className="chat-text-rounds">
                            <input type="text" name="message_box" className="chat-room-id" placeholder="Your Message" onChange={(e) => {
                            setMessage(e.target.value);
                            }}
                            value={message}/>
                            <div className="chat-glass-shadow chat-shadow-width"></div>
                        </div>
                        <div className="send-button-rounds">
                            <button className="send-button">
                              <h6>Send</h6>
                            </button>   
                            <div className="send-glass-shadow"></div>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Chat