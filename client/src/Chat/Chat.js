import React,{ useState } from 'react'
import io from 'socket.io-client';
import './Chat.css';
import ChatComponent from './ChatComponent';

function Chat(props) {

    

 

    const socket = io.connect("http://localhost:5555");
    socket.emit('enter chatroom');

    socket.on('my socket id', (data) => {
        console.log('mySocketID : ' , data);
        // dispatch(action.mySocketId(data.socketId));
    });

    socket.on('client login', (data) => {
        console.log('client login : ',data)
    });

   
    socket.on('disconnected', data => {
        console.log('leave chatroom ', data);
    })


    
    
    

        

    
    return (
      <div>
          <ChatComponent></ChatComponent>
      </div>
    );
}



export default React.memo(Chat,Chat.onMessageHandler);

