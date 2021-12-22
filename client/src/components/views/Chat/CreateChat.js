import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createChat } from '../../../_actions/chat_action'

function CreateChat(props) {


    const dispatch = useDispatch()
    const [chatTitle,setChatTitle] = useState("")

    
    const onChatTitleHandler = (event) =>{
        setChatTitle(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            roomName : chatTitle
        }

        dispatch(createChat(body)).then( response => {
            console.log('response : '+JSON.stringify(response.payload.success))
            if(response.payload.success){
                props.history.push("/boards")
            } else {
                alert("Failed to CreateChat")
            }
        })
    }
    
    const onClick = (event) => {
        props.history.goBack()
    }
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>

            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >

            <label>chat Title</label>
            <input type="text" value={chatTitle} onChange={onChatTitleHandler} />
            <br/>
            <button type="submit">작성</button>
            

            </form>
            <button onClick = { onClick }>취소</button> 
        </div>
    )
}

export default CreateChat
