import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import userService from '../services/UserService';
import { receiveUser, receiveLoginUserInfo, loginUserFail, unauthorisedUser } from '../actions/UserActions';
import { REQUEST_USER, REQUEST_LOGIN_USER } from '../constants/UserActionTypes';

function* fetchUserInfo() {
    try {
        const data = yield call(() => userService.getUserInfo());
        yield put(receiveUser(data));
    }
    catch (error) {
        yield put(unauthorisedUser());
        console.log(error);
    }
}

export function* watchRequestUserInfo() {
    yield takeEvery(REQUEST_USER, fetchUserInfo);
}

function* fetchUserLogin(action) {
    const { email, password } = action.payload;
    try {
        const data = yield call(() => userService.login(email, password));
        yield put(receiveLoginUserInfo(data));
        yield put(push('/'));
    }
    catch (error) {
        console.log(error.message);
        yield put(loginUserFail());
    }
}

export function* watchRequestUserLogin() {
    yield takeEvery(REQUEST_LOGIN_USER, fetchUserLogin);
}
