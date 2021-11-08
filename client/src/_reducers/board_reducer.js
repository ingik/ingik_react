export default function(state = {}, action){

    switch(action.type){

        case "create_board":
            return {...state, createBoardData: action.payload }

        default:
            return state;
    }
}