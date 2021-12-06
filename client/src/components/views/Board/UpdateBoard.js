import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import { updateBoard } from '../../../_actions/board_action'


function UpdateBoard(props) {

    const dispatch = useDispatch()

    const [Username] = useState("")
    const [Title,setTitle] = useState("")
    const [Content,setContent] = useState("")

    console.log('(updateboard)props :'+ JSON.stringify(props))


    

    
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onContentHander = (event) => {
        setContent(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {

        event.preventDefault()


        let body = {
            username : Username,
            title : Title,
            content : Content,
            id : props.match.params.key
        }

        dispatch(updateBoard(body)).then(response => {
            console.log('(updateBoard)response : '+JSON.stringify(response))
                if(response.type === "update_board"){
                    props.history.push("/boards")
                }else{
                    alert("Failed to updateboards")
                }
            
        })

    }

    const onBack = () => {
        props.history.goBack()
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>

                <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>

                    <label>Title</label>
                    <input type="text" value={Title} onChange={onTitleHandler} />

                    <label>Content</label>
                    <input type="text" value={Content} onChange={onContentHander} />


                    <br/>
                    <button type="submit">작성</button>
                    
                </form>
                <button onClick = { onBack }>취소</button>
            </div>
            
        </div>
    )
}

export default withRouter(UpdateBoard)
