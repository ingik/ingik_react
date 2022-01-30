import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    // AUTH_USER_UPDATE
} from '../_actions/types';


// 리듀서는 항상 순수해야한다. 순수 함수로 이루어져 있다. state가 수정되어선 안됨
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {

    switch(action.type) {

        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            // eslint-disable-next-line no-unreachable
            break;
                //action.payload에 데이터가 담긴다.
        case REGISTER_USER:
            return { ...state, registerData: action.payload }
            // eslint-disable-next-line no-unreachable
            break;
            
        case AUTH_USER:
            return { ...state, userData: action.payload }
            // eslint-disable-next-line no-unreachable
            break;
        
        // case AUTH_USER_UPDATE:
        //     return { ...state, userData: action.payload }
        //     // eslint-disable-next-line no-unreachable
        //     break;

        default:
            return state;
    }
}