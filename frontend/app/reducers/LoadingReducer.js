import { REQUEST_USER, RECEIVE_USER, UNAUTHORISED_USER } from '../constants/UserActionTypes';

const initialState = {
    isLoadingUser: true,
};

export function loading(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isLoadingUser: true,
            };
        case RECEIVE_USER:
            return {
                ...state,
                isLoadingUser: false,
            };
        case UNAUTHORISED_USER:
            return {
                ...state,
                isLoadingUser: false,
            };
        default:
            return state;
    }
}
