import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client'
import { chatDetail, chatRefresh, sendMessage } from '../../../_actions/chat_action';
import './Chat.css';

const localhost = 'http://localhost:5555';

let socket
function ChatDetail(props) {

    const dispatch = useDispatch()
    const [Message,setMessage] = useState("")
    const [MessageObject,setMessageObject] = useState([]);
    const [otherMessage,setOtherMessage] = useState([]);


    let RoomName = new URLSearchParams(props.location.search).get('roomName')

    // console.log('(Chat)props : '+JSON.stringify(props.location.user))

    let chatUser = props.location.user;
  
    const onSubmitHandler = (event) => {

        console.log("onSubmitHandler")
        event.preventDefault();

        let body = {
          message : Message,
          roomName : RoomName,
          userName : 'testerUser'
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

        socket.emit('enter chatroom');
        socket.on('my socket id', (data) => {
            console.log('mySocketID : ' , data);
        });
    
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

      console.log('(Chat)props : '+JSON.stringify(props.location.user))
        socket.on('all message',(data) => {
            console.log('frond Data : '+JSON.stringify(data))
            
            RefreshDispatch()
            //Dispatch로 전체 데이터를 get 해오면 데이터낭비 
            
        })
        // console.log('otherMessage : '+JSON.stringify(otherMessage))
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

    const otherList = otherMessage.map((data) => {
      // console.log('data : '+data)
      return  <div key={data.regDate}> { data.chat } </div>
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
            <ul>{ otherList }</ul>
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
