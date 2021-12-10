import React,{useState} from 'react'
import { useDispatch } from 'react-redux'

function ChatComponent() {

    const dispatch = useDispatch()

    const [Message,setMessage] = useState("")

    const onSubmitHandler = (event) => {
        console.log("onSubmitHandler")
        event.preventDefault();
        // setMessage("")

        dispatch()
    }

    const onMessageHandler = (event) => {
        console.log("onMessageHandler")
        setMessage(event.currentTarget.value)
    }


    return (
        <div>
            <div className="chat_wrap">
        <div className="header">CHAT</div>
        <div className="chat">
          <ul>{/* <!-- 동적 생성 --> */}sasdf</ul>
        </div>

        <div className="input-div">
            <form onSubmit = {onSubmitHandler}>
                <textarea placeholder="Press Enter for send message." type="text" onChange = { onMessageHandler } value={Message}/>
                <button type="submit" className="send_button">send</button>
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
    )
}

export default ChatComponent
