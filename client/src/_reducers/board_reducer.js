import { 
    CREATE_BOARD 
} from '../_actions/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action){

    switch(action.type){

        case CREATE_BOARD:
            return {...state, createBoardData: action.payload }

        default:
            return state;
    }
}