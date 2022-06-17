import React,{useState} from 'react'
import "./style_join.css"
const Join = ({connectToRoom}) => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");

  return (
    <main>
        <section className='join-section'>
            <h1 className='join-h'>Join Room</h1>
            <header className='join-header'></header>
            <div className="join-content">
                <div className="join-text-rounds">
                    <input type="text" name="username" id="join-room-id" placeholder="User Name" onChange={(e) => {
                            setUserName(e.target.value);
                        }}/>
                    <div className="join-glass-shadow join-shadow-width"></div>
                </div>
                <div className="join-text-rounds">
                    <input type="text" name="room-id" id="join-room-id" placeholder="Room ID"onChange={(e) => {
                            setRoom(e.target.value);
                        }}/>
                    <div className="join-glass-shadow join-shadow-width"></div>
                </div>
                <div className="join-button-rounds join-shadow">
                    <div className="join-button join" onClick={(e)=>{
                        return (e.preventDefault, 
                            connectToRoom(room, userName)
                        )}}>
                        <p>Join Room</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Join