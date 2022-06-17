import React from 'react'
import "./index.css"

const Index = ({pick_choice}) => {

    

  return (
    <main>
        <section className='index-section'>
            <h1 className='index-h'>Welcome To Chat App</h1>
            <header className='index-header'></header>
            <div className="content">
                <div className="button-rounds">
                    <div className="button" onClick={(e)=>{
                        return (e.preventDefault, 
                        pick_choice("CREATE")
                        )}}>
                        <h2>Create Room</h2>
                    </div>
                    <div className="glass-shadow"></div>
                </div>
                <div className="button-rounds">
                    <div className="button" onClick={(e)=>{
                        return (e.preventDefault, 
                        pick_choice("JOIN")
                        )}}>
                        <h2>Join Room</h2>
                    </div>
                    <div className="glass-shadow"></div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Index