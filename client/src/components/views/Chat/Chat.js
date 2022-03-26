import React from 'react'
import './Chat.css';
import ChatComponent from './ChatComponent';
import * as ChatJS from './ChatJS';

function Chat(props) {
    ChatJS.connectionSocket()
    
    return (
      <div style={{marginTop:'64px'}}>
          <ChatComponent/>
      </div>
    );
}




export default Chat;

