import { 
    CREATE_BOARD,
    BOARD_LIST,
    BOARD_DETAIL,
    UPDATE_BOARD,
    DELETE_BOARD
} from '../_actions/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action){

    switch(action.type){

        case CREATE_BOARD:
            return {...state, createBoardData: action.payload }

        case BOARD_LIST :
            return {...state, boardListData: action.payload}

        case BOARD_DETAIL :
            return {...state, boardDetailData: action.payload}
        
        case UPDATE_BOARD :
            return {...state, updateBoardData: action.payload}

        case DELETE_BOARD : 
            return {...state, deleteBoardDate: action.payload}

        default:
            return state;
    }
}