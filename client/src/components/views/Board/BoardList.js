import React, {Component, useEffect, useState} from 'react'
import { render } from 'react-dom'
import { useDispatch } from 'react-redux'
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
            console.log('response.payload : '+ response.payload)
            setData(response.payload)
        })
    },[])

     console.log('result : '+ JSON.stringify(Data))

    
    const List = Data.map((data) =>{
        return <ul key={data._id}>
                <li>{data.title}</li>
                <li>{data.content}</li>
            </ul>
      })
       

    return (
        <div>
            { List }
        </div>
    )
}

export default BoardList;