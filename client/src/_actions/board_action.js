import axios from "axios"
import {
     CREATE_BOARD,
     BOARD_LIST
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

    const request = axios.get('/api/boards',dataToSubmit).then(response => response.data)
        console.log('boardlist : '+JSON.stringify(request))

        return{
            type: BOARD_LIST,
            payload: request
        }

}

