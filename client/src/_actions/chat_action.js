import {    CHAT_LIST, 
            CREATE_CHAT, 
            SEND_CHAT 
} from "./types"
import  axios  from "axios"



export function sendMessage(dataToSubmit){

    const request = ""


    return {
        type : SEND_CHAT,
        payload : request
    }

}

export function chatList(dataToSubmit){
    
    const request = ""

    return {
        type: CHAT_LIST,
        payload : request
    }
}

export function createChat(dataToSubmit){

    const request = axios.post('/api/chat/create',dataToSubmit)
    .then( response => response.data ).catch(err => console.log('createChatAction error'+err))


    return {
        type: CREATE_CHAT,
        payload: request
    }

}