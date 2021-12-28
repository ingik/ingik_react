import {    CHAT_LIST, 
            CREATE_CHAT, 
            SEND_CHAT,
            CHAT_DETAIL
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
    
    const request = axios.get('/api/chat/list',dataToSubmit)
    .then(response => response.data).catch(error => console.log('chatList error'+error))

    return {
        type: CHAT_LIST,
        payload : request
    }
}

export function createChat(dataToSubmit){

    const request = axios.post('/api/chat/create',dataToSubmit)
    .then( response => response.data ).catch(error => console.log('createChatAction error'+error))


    return {
        type: CREATE_CHAT,
        payload: request
    }

}

export function chatDetail(dataToSubmit){

    const request = axios.post('/api/chat/detail',dataToSubmit)
    .then(response => response.data).catch(error => console.log('chatDetail error'+error))
    // console.log('(chat_action)chatDetail : '+ JSON.stringify(dataToSubmit))

    return {
        type : CHAT_DETAIL,
        payload: request
    }


}

