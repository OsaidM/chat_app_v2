import React,{useState} from 'react'
import axios from "axios";
import "./style_join.css"
const Join = ({joinRoom}) => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [err, setErr] = useState("");

    const check_and_join = ()=>{
        axios.post('http://localhost:8000/get-room',{room}).then(res=>{
          console.log(res.data)
          joinRoom(room, userName)
        }).catch(err=>{
          console.log(err.response.data)
          setErr(err.response.data);
        })
    }

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
                            check_and_join()
                        )}}>
                        <p>Join Room</p>
                    </div>
                </div>
            <div className='error'>
                {err}
            </div>
            </div>
        </section>
    </main>
  )
}

export default Join