import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBoard } from '../../../_actions/board_action'
import { withRouter } from 'react-router-dom'

function CreateBoard(props) {

    const dispatch = useDispatch();

    //const [Index, setIndex] = useState("")
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [Username] = useState("")

    const onContentHander = (event) => {
        setContent(event.currentTarget.value)
    }

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            username : Username,
            title : Title,
            content : Content
        }
    
        dispatch(createBoard(body)).then(response => {
                console.log('response : '+JSON.stringify(response.payload.success))
                if(response.payload.success){
                    props.history.push("/board")
                }else{
                    alert("Failed to createboard")
                }
        })
    }

    const onClick = (event) => {
        props.history.push("/")
        
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>

            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >

            <label>Title</label>
            <input type="text" value={Title} onChange={onTitleHandler} />

            <label>Content</label>
            <input type="text" value={Content} onChange={onContentHander} />


            <br/>
            <button type="submit">작성</button>
            <button onClick = { onClick }>취소</button> 

            </form>
        </div>
    )
}

export default withRouter(CreateBoard)
