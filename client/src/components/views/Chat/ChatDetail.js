import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import './Chat.css';

const localhost = 'http://localhost:5555';

let socket
function ChatDetail() {

    const dispatch = useDispatch()
    const [Message,setMessage] = useState("")
    const [MessageObject,setMessageObject] = useState([]);
    const [otherMessage,setOtherMessage] = useState([]);
  
    const onSubmitHandler = (event) => {

        console.log("onSubmitHandler")
        event.preventDefault();

        console.log('Message : '+Message)
        setMessageObject([...MessageObject, Message])
        console.log('setMessageObject : '+MessageObject)

        socket.emit('send message',Message)
        setMessage("")

        
    }

    
    useEffect(() => {
        socket = io.connect(localhost)
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

    }, [localhost])

    useEffect(() => {
        socket.on('all message',(data) => {
            console.log('frond Data : '+JSON.stringify({chat:data.chat,socketId:data.socketId}),
            // dispatch(sendMessage()).then()
            setOtherMessage([...otherMessage, data])
            )})

        console.log('otherMessage : '+JSON.stringify(otherMessage))

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
      // console.log('data : '+data)
      return  <div key={data}> { data } </div>
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

export default ChatDetail
