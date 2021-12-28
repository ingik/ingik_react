import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { chatList } from '../../../_actions/chat_action'

function ChatList(props) {

    const dispatch = useDispatch()
    const [Data,setData] = useState([])

    



    useEffect(() => {
        console.log('(Chat)props : '+JSON.stringify(props.location))
        console.log('(ChatList)props : '+JSON.stringify(props.location))
        dispatch(chatList()).then( response => {
            if(response.payload){
                setData(response.payload)
            } else {
                alert("Failed to chatList")
            }
        })
    }, [])

    const List = Data.map((data) =>{

        const url = data.roomName

        const onRoad = () => props.history.push({
            pathname : '/chat/',
            search : '?roomName='+url
        })

        return <div key={data._id}>
                <div><Link 
                to={{pathname : '/chat/',
                search : '?roomName='+url}}
                >{data.roomName}</Link></div>
                {/* <div><button onClick={ onRoad }>{data.roomName}</button></div> */}
            </div>
    })

    const  onClickHandler = () => {
        props.history.push('./create')
    }



    return (
        <div>
            <div><button onClick = { onClickHandler }> Room Create</button></div>
            { List }
        </div>
    )
}

export default withRouter(ChatList)
