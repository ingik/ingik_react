import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client'
import {  chatRefresh  } from '../../../_actions/chat_action';
import './Chat.css';

const localhost = 'http://localhost:5555';

let socket
function ChatDetail(props) {

    const dispatch = useDispatch()
    const [Message,setMessage] = useState("")
    const [MessageObject,setMessageObject] = useState([]);


    let RoomName = new URLSearchParams(props.location.search).get('roomName')
  
    const onSubmitHandler = (event) => {

        console.log("onSubmitHandler")
        event.preventDefault();

        let body = {
          message : Message,
          roomName : RoomName,
          userName : props.location.user
        }

        socket.emit('send message',body)
        setMessage("")
        
    }

    // 쿼리스트링
    // console.log('match : '+)
    
    useEffect(() => {
      
        socket = io.connect(localhost)
        socket.emit('joinRoom', RoomName)
        socket.on('room Info',(data)=>{ console.log('Room info : '+ data)})

        socket.on('my socket id', (data) => {
          console.log('mySocketID : ' , data);
        });

        socket.emit('enter chatroom');
        
        socket.on('client login', (data) => {
            console.log('client login : ',data)
        });
       
        socket.on('disconnected', data => {
            console.log('leave chatroom ', data);
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localhost,props.location.search])

    function RefreshDispatch(){

      let body = {
        roomName : RoomName
      }

      dispatch(chatRefresh(body)).then(response =>{
        setMessageObject(response.payload)
        console.log('response : '+JSON.stringify(response))
        console.log('MessageObject : '+JSON.stringify(MessageObject))
      })
    }


    //채팅 처음 설정
    useEffect(() => {

      let body = {
        roomName : RoomName
      }

      dispatch(chatRefresh(body)).then(response =>{
        setMessageObject(response.payload)
        console.log('response : '+JSON.stringify(response))
        console.log('MessageObject : '+JSON.stringify(MessageObject))
      })

        socket.on('all message',(data) => {
            console.log('frond Data : '+JSON.stringify(data))
            
            RefreshDispatch()
            // Dispatch로 전체 데이터를 get 해오면 데이터낭비 
            // 채팅 리프레시를 채팅 전체를 get해서 받아와 리렌더링을 해주고있는데
            // 불필요한 데이터를 가져와 렌더링에 손해를 보고있어서 수정이 필요할듯
            
        })
        // console.log('otherMessage : '+JSON.stringify(otherMessage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const onMessageHandler = (event) => {
        console.log("onMessageHandler")
        setMessage(event.currentTarget.value)
    }

    // const onKetEnter = (event) => {
    //   if(event.key === 'Enter'){
    //     onSubmitHandler()
    //   }
    // }

    const List = MessageObject.map((data) => {
      return  <div key={data._id}>
         <div>{ data.message } </div>
         </div>
    })

  

    return (
      <div>
        <div className="chat_wrap">
          <div className="header">CHAT</div>
          <div className="chat">
            <ul>
              {/* <!-- 동적 생성 --> */}
              { List }
            </ul>
          </div>

          <div className="input-div">
            <form>
              <textarea
                placeholder="Press Enter for send message."
                type="text"
                onChange={onMessageHandler}
                value={Message}
                // onKeyPress={ onKetEnter }
              />
              <button className="send_button" onClick={onSubmitHandler}>
                send
              </button>
            </form>
          </div>

          {/* <!-- format --> */}

          <div className="chat format">
            <ul>
              <li>
                <div className="sender">
                  <span></span>
                </div>
                <div className="message">
                  <span></span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    );
}

export default withRouter(ChatDetail)
