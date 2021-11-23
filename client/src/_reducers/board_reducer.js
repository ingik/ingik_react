import { 
    CREATE_BOARD,
    BOARD_LIST
} from '../_actions/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action){

    switch(action.type){

        case CREATE_BOARD:
            return {...state, createBoardData: action.payload }

        case BOARD_LIST :
            return {...state, boardListData: action.payload}

        default:
            return state;
    }
}