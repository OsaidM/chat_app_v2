import React,{useState} from 'react'
import "./style_create.css"
const Create = ({createRoom}) => {
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [roomSize, setRoomSize] = useState(null);

  return (
    <main>
        <section className='create-section'>
            <h1 className='create-header-h'>Create Room</h1>
            <header className='create-header'></header>
            <div className="create-content">
                <div className="col">
                    <div className="create-text-rounds">
                        <input type="text" name="username" className="room-id" placeholder="User Name" onChange={(e) => {
                            setUserName(e.target.value);
                        }}/>
                        <div className="create-glass-shadow shadow-width"></div>
                    </div>
                    <div className="create-text-rounds">
                        <input type="text" name="room-id" className="room-id" placeholder="Room ID" onChange={(e) => {
                            setRoom(e.target.value);
                        }}/>
                        <div className="create-glass-shadow shadow-width"></div>
                    </div>
                    <div className="create-text-rounds">
                        <input type="number" name="room-size" className="room-id" placeholder="2" onChange={(e) => {
                            setRoomSize(e.target.value);
                        }}/>
                        <div className="create-glass-shadow shadow-width"></div>
                    </div>
                </div>
                <div className="create-button-rounds create-shadow">
                    <div className="create-button create" onClick={(e)=>{
                        return (e.preventDefault, 
                            createRoom(room, userName, roomSize)
                        )}}>
                        <p>Create Room</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Create