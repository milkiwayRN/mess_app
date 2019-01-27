import { REQUEST_DIALOGS, RECEIVE_DIALOGS } from '../constants/DialogsActionTypes';

export function dialogs(state = {}, action) {
    switch (action.type) {
        case REQUEST_DIALOGS:
            return state;
        case RECEIVE_DIALOGS:
            return {
                dialogsIds: action.payload,
            };
        default:
            return state;
    }
}
