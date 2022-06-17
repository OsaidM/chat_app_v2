import React from "react";
// import "./App.css";
import {Router, navigate} from "@reach/router"
// import Chat from "./components/Chat"
import Chat from "./components/chat_component/Chat";
import Main from "./components/Main"
import Index from "./components/index_component/Index";
import Create from "./components/create_component/Create";
import Join from "./components/join_component/Join";

function App() {

  const connectToRoom = (room,username, roomsize=null) => {
    roomsize === null ?
    navigate(`/chat/${room}/${username}`)
    :
    navigate(`/chat/${room}/${username}`)
  };
  const pick_choice = (choice)=>
  {return(
    choice && choice === "CREATE"?
    navigate(`/create/room`)
    :
    choice === "JOIN"?
    navigate(`/join/room`):
    ""
  )}
  return (
    <div className="App">
      <Router>
        <Index path="/" pick_choice={pick_choice}/>
        <Create path="/create/room" connectToRoom={connectToRoom}/>
        <Join path="/join/room" connectToRoom={connectToRoom}/> 
        <Chat path="/chat/:room/:name"/>
      </Router>
    </div>
  );
}

export default App;
