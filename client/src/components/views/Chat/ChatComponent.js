import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import * as ChatJS from './ChatJS'



function ChatComponent(props) {


    // const dispatch = useDispatch()
    const [Message,setMessage] = useState("")
    const [MessageObject,setMessageObject] = useState([]);

  
    const onSubmitHandler = (event) => {

        console.log("onSubmitHandler")
        event.preventDefault();
        console.log('Message : '+Message)
        setMessageObject([...MessageObject, Message])
        console.log('setMessageObject : '+MessageObject)
        ChatJS.ChatSocket(Message)


        
        setMessage("")
    }
    
    useEffect(() => {
      console.log('useEffect')
      ChatJS.ReceiveChatSocket()
      console.log('asdf : '+ ChatJS.ReceiveChatSocket())

    }, [])

    
    const onMessageHandler = (event) => {
        console.log("onMessageHandler")
        setMessage(event.currentTarget.value)
    }

    const List = MessageObject.map((data) => {
      // console.log('data : '+data)
      return  <div key={data}> { data } </div>
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
            <form onSubmit={onSubmitHandler}>
              <textarea
                placeholder="Press Enter for send message."
                type="text"
                onChange={onMessageHandler}
                value={Message}
              />
              <button type="submit" className="send_button">
                send
              </button>
            </form>
          </div>

          {/* <!-- format --> */}

          <div className="chat format">
            <ul>
              <li>
                <div className="sender">
                  <span>dafsd</span>
                </div>
                <div className="message">
                  <span>asdfasdf</span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    );
}

export default ChatComponent
