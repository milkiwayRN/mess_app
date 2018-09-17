import { RECEIVE_USER, LOGIN_USER_FAIL } from '../constants/UserActionTypes';

export function user(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload;
        case LOGIN_USER_FAIL:
            return {
                isLoginFail: true,
            };
        default:
            return state;
    }
}
