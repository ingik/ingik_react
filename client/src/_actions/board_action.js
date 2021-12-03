import axios from "axios"
import {
     CREATE_BOARD,
     BOARD_LIST,
     BOARD_DETAIL
    } from "./types"


export function createBoard(dataToSubmit){

    const request = axios.post('/api/boards/create', dataToSubmit)
    .then(response => response.data)

    return{
        type: CREATE_BOARD,
        payload: request
    }
}

export function boardList(dataToSubmit){

    const request = axios.get('/api/boards/list',dataToSubmit).then(response => response.data)

        return{
            type: BOARD_LIST,
            payload: request
        }

}

export function boardDetail(dataToSubmit){

    const request = axios.get('/api/boards/detail/'+dataToSubmit.id,dataToSubmit).then(response => response.data)
    console.log('dataToSubmit : '+JSON.stringify(dataToSubmit))

    return{
        type: BOARD_DETAIL,
        payload: request
    }
}

