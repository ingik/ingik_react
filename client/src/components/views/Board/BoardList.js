import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import { boardList } from '../../../_actions/board_action'


function BoardList(props) {

    const dispatch = useDispatch()
    const [Data,setData] = useState([])

    
    //redux lifecycle 연습
    //action
    /* function boardList(dataToSubmit){

        const request = axios.get('/api/boards',dataToSubmit).then(response => response.data)
        console.log('boardlist : '+JSON.stringify(request))

        return{
            type: BOARD_LIST,
            payload: request
        }
    } */
    
    //reducer
    /* function board_reducer(state = {},action){

        switch(action.type){

            case BOARD_LIST :
                return {...state, boardListData: action.payload}
            default:
                return state
        }
    } */

    useEffect(() => {
        dispatch(boardList()).then( response => { 
            // console.log('response.payload : '+ JSON.stringify(response.payload))
            setData(response.payload)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //  console.log('boardlist.Data : '+ JSON.stringify(Data))
    

    
    const List = Data.map((data) =>{

        const url = data._id
        return <div key={data._id}>
                <div><Link to={'/boards/detail/'+url}>{data.title}</Link></div>
            </div>
      })

    const  onClickHandler = () => {
        props.history.push('/createboard')
    }
       
    return (
        <div>
            <div><button onClick = { onClickHandler }>Create</button></div>
            { List }
        </div>
    )
}

export default withRouter(BoardList);