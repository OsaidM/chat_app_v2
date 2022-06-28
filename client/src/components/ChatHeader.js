import React from 'react'

const ChatHeader = ({header_content}) => {
  return (
    <header className='chat-header'>
        <h1 className='chat-h'>{header_content}</h1>
        <div className='chat-header-background'></div>
    </header>
  )
}

export default ChatHeader