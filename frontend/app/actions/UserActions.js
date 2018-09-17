import isEqual from 'lodash/isEqual';

import { REQUEST_USER, REQUEST_LOGIN_USER, RECEIVE_USER, UNAUTHORISED_USER, LOGIN_USER_FAIL } from '../constants/UserActionTypes';
import userStorage from '../utils/SessionUserStorage';

export function requestUser() {
    return {
        type: REQUEST_USER,
    };
}

export function requestLoginUser(email, password) {
    return {
        type: REQUEST_LOGIN_USER,
        payload: {
            email,
            password,
        },
    };
}

export function receiveUser(newUser) {
    const { user } = userStorage.data;

    if (isEqual(user, newUser)) {
        return {};
    }
    else {
        userStorage.data = {
            ...userStorage.data,
            user: newUser,
        };
        return {
            type: RECEIVE_USER,
            payload: newUser,
        };
    }
}

export function receiveLoginUserInfo(payload) {
    userStorage.data = payload;
    return {
        type: RECEIVE_USER,
        payload: payload.user,
    };
}

export function loginUserFail() {
    return {
        type: LOGIN_USER_FAIL,
    };
}

export function unauthorisedUser() {
    return {
        type: UNAUTHORISED_USER,
    };
}
