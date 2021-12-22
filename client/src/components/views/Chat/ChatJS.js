import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { sendMessage } from '../_actions/chat_action';
import * as ChatComponent from './ChatComponent'


const socket = io.connect("http://localhost:5555");


export function connectionSocket(){

        socket.emit('enter chatroom');
      
        socket.on('my socket id', (data) => {
            console.log('mySocketID : ' , data);
            socket.emit('return socket id',data.socketId)
            // dispatch(action.mySocketId(data.socketId));
        });
    
        socket.on('client login', (data) => {
            console.log('client login : ',data)
        });
       
        socket.on('disconnected', data => {
            console.log('leave chatroom ', data);
        })
        
        // socket.on('send message')
}

export function ChatSocket(data){

    // let [ReChat,setReChat] = useState("")

    socket.emit('send message',data)
    
}

export function ReceiveChatSocket(){

    

     socket.on('all message',(data) => {console.log('frond Data : '+{chat:data.chat,socketId:data.socketId})})

    
}


// export function chatSocketToComponent(){
//     socket.on('all message',(data) => {
//         console.log('front data : '+{chat : data.chat,socket : data.socketId})
//     })
// }
