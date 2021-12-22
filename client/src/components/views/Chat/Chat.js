import React from 'react'
import './Chat.css';
import ChatComponent from './ChatComponent';
import * as ChatJS from './ChatJS';

function Chat(props) {
    ChatJS.connectionSocket()
    
    return (
      <div>
          <ChatComponent/>
      </div>
    );
}




export default Chat;

