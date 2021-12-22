import { 
    SEND_CHAT,
    CHAT_LIST,
    CREATE_CHAT 
} from "../_actions/types";


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state={}, action){

    switch(action.type){

        case SEND_CHAT : 
            return {...state, sendMessageData: action.payload}

        case CHAT_LIST :
            return {...state, chatListData: action.payload}

        case CREATE_CHAT :
            return {...state, createChatData: action.payload}

        default:
            return state;
    }
}