import { REQUEST_DIALOGS, RECEIVE_DIALOGS } from '../constants/DialogsActionTypes';

export function requestUserDialogsIds() {
    return {
        type: REQUEST_DIALOGS,
    };
}

export function receiveUserDialogIds(dialogsIds) {
    return {
        type: RECEIVE_DIALOGS,
        payload: dialogsIds,
    };
}
