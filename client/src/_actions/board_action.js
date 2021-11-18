import axios from "axios"
import {
     CREATE_BOARD 
    } from "./types"


export function createBoard(dataToSubmit){

    const request = axios.post('/api/boards/create', dataToSubmit)
    .then(response => response.data)

    return{
        type: CREATE_BOARD,
        payload: request
    }
}

