import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { BOARD_LIST } from '../../../_actions/types'



export default function BoardList() {

    const dispatch = useDispatch()

    let data = {
        
    }


    
    dispatch(boardList(data)).then( response => { 

        console.log('boardlist.response.payload : '+JSON.stringify(response.payload))
        console.log('board-reducer : '+response.payload.boardListData)
        console.log('response : '+JSON.stringify(response.type))
        data = board_reducer(response.payload,response.type)
        console.log('result : '+ JSON.stringify(data))
        
    })

    //action
    function boardList(dataToSubmit){

        const request = axios.get('/api/boards',dataToSubmit).then(response => response.data)
        console.log('boardlist : '+JSON.stringify(request))

        return{
            type: BOARD_LIST,
            payload: request
        }
    }
    

    //reducer
    function board_reducer(state = {},action){

        switch(action.type){

            case BOARD_LIST :
                return {...state, boardListData: action.payload}
            default:
                return state
        }
    }
    

    return (
        <div>
            <table>
                <tr>
                    <td></td>
                </tr>

            </table>
            
        </div>
    )
}
