import { combineReducers } from "redux";
import user from './user_reducer';
import board from './board_reducer';
import chat from './chat_reducer';

const rootReducer = combineReducers({
    user,board,chat
})

export default rootReducer;