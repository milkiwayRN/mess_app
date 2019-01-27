import { takeEvery, put, call } from 'redux-saga/effects';

import dialogsService from '../services/DialogsService';
import { receiveUserDialogIds } from '../actions/DialogsActions';
import { REQUEST_DIALOGS } from '../constants/DialogsActionTypes';

function* fetchUserDialogsIds() {
    try {
        const data = yield call(() => dialogsService.getUserDialogsIds());
        yield put(receiveUserDialogIds(data.dialogsIds));
    }
    catch (error) {
        console.log(error);
    }
}

export function* watchRequestUserDialogsIds() {
    yield takeEvery(REQUEST_DIALOGS, fetchUserDialogsIds);
}

