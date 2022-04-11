import { Avatar, Button, Divider, TextField } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client';
import './Chat.css';



const localhost = 'http://localhost:5555';
let socket

function DMList(props) {


    const userData = useSelector(state => state.user.userData)

    
    const [ChatList, setChatList] = useState([])
    const [Message, setMessage] = useState(null)

    const [ChatData, setChatData] = useState(null)
    const [OtherUser, setOtherUser] = useState(null)

    const [ChatRoomId, setChatRoomId] = useState(null)

    const ScrollRef = useRef(null)


    useEffect(() => {
      
      axios.get("/api/users/findId/"+props.OtherUserId).then(response => {
        console.log(response.data)
        setOtherUser(response.data)
      })
      
    },[props.OtherUserId])


    useEffect(() => { 

      const params = {
        user: userData._id,
        other: props.OtherUserId,
      };
      
      axios.get("/api/DirectMessage/chatList/",{params}).then(response => {
        console.log(response.data[0])
        setChatData(response.data[0])
        setChatList(response.data[0].chatList)
        // socketFunc(response.data[0]._id)
        setChatRoomId(response.data[0]._id)

      })


        
    },[props.OtherUserId])


      
    useEffect(()=>{
      if(ChatRoomId){
      console.log('socket start')

        socket = io.connect(localhost)
        
        console.log('RoomId : '+ChatRoomId)
        socket.emit('joinRoom', ChatRoomId)
        socket.on('room Info',(data)=>{ console.log('Room info : '+ data)})

        socket.on('my socket id', (data) => {
          console.log('mySocketID : ' , data);
        });

        socket.emit('enter chatroom',userData.name);

        socket.on('client login', (data) => {
            console.log('client login : ',data)
        });

        socket.on('all message',(data) => {
          console.log('receive message')
          console.log(data)

          setChatList((prevState) => {
            return [...prevState, data]
          })
        })

        
        return ()=>{
          socket.disconnect()
          socket.on('disconnected', data => {
            console.log('leave chatroom ', data);
          })
          socket = undefined
        }
      }
      },[ChatRoomId])

      useEffect(()=>{
        console.log('scroll')
        // ScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        ScrollRef.current.scrollIntoView(false);
      },[ChatList])

    
    const onMessageHandler = (event) => {
      setMessage(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
      console.log('Submit')
      // event.preventDefault()

      let body = {
        _id:ChatData._id,
        chatSendId:userData._id,
        chatContent:Message,
      }

      console.log(body)
      socket.emit('send message',body)
      
      // setMessage("", "")
      setMessage("", "")

    }

    const userRender = (list) => {

      if(list.chatSendId === userData._id ){
      return (
        <div className="chat_user_card">
          <div className="chat_user_flex">
            <div className="chat_user">{list.chatContent}</div>
          </div>
        </div>
      );
      }else{
        return (
          <div className="chat_other_card">
            <div 
              className='chat_other_flex'
              style={{marginLeft:'5px'}}
            >
              <Avatar
                alt={OtherUser?.name}
                src={OtherUser?.image}
                className="chat_other_avatar"
                // sizes='15px'
                sx={{
                  width:"30px",
                  height:"30px",
                  verticalAlign:'center',
                  margin:'auto 0'
                }}
              />

              <div className="chat_other">{list.chatContent}</div>
            </div>
          </div>
        );
      }
    }

    const onCheckEnter = (event) => {
      event.preventDefault()
      if(event.key === 'Enter') {
        onSubmitHandler()
      }
    }



  return (
    <div
      style={{
        width: "70vh",
        marginTop:'20px'
      }}
    >
      <div className="chat_wrap">
        <div className='chat_header'>
              <Avatar
                alt={OtherUser?.name}
                src={OtherUser?.image}
                className="chat_avarta"
              />
          <div className="chat_header_name">{OtherUser?.name}</div>
        </div>
        <Divider />
        <div 
          className="chat_form"
          // ref={ScrollRef}
        >
            { ChatList.map((list,index) => {
              return (
              <div key={index}>
                  {userRender(list)}
                </div>
              )

            }) }
            <div ref={ScrollRef}></div>
        </div>

        <div className="input-div">
          <form 
            className="input-form"
            onKeyPress={ onCheckEnter }
          
          >
            <TextField
              variant="outlined"
              placeholder="Press Enter for send message."
              type="text"
              // className="input-textarea"s
              sx={{ width: "100%" }}
              multiline={true}
              inputProps={{ style: { height: "100px" } }}
              size="500"
              row="500"
              onChange={onMessageHandler}
              value={Message || ''}
            />
            <Button className="send_button" variant="contained" onSubmit={ onSubmitHandler }>
              send
            </Button>
          </form>
        </div>

      
      </div>
    </div>
  );
}

export default DMList;