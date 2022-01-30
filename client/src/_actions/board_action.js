import axios from "axios"
import {
     CREATE_BOARD,
     BOARD_LIST,
     BOARD_DETAIL,
     UPDATE_BOARD,
     DELETE_BOARD
    } from "./types"


export function createBoard(dataToSubmit){

    const request = axios.post('/api/boards/create', dataToSubmit)
    .then(response => response.data).catch(err => console.log('action create error' + err))

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

export function updateBoard(dataToSubmit){

    const request = axios.post('/api/boards/detail/'+dataToSubmit.id+'/update',dataToSubmit).then(response => response.data)
    console.log('dataToSubmit : '+JSON.stringify(dataToSubmit))

    return {
        type: UPDATE_BOARD,
        payload: request
    }
}

export function deleteBoard(dataToSubmit){
    const request = axios.delete('/api/boards/detail/'+dataToSubmit.id,dataToSubmit).then(response => response.data)
    console.log('dataToSubmit : '+JSON.stringify(dataToSubmit))

    return {
        type: DELETE_BOARD,
        payload: request
    }
}


