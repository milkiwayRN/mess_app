import apiService from './ApiService';
import { DIALOGS_URL } from '../constants/ServicesURLConstants';

const dialogsService = {
    getUserDialogsIds: () => apiService.get(DIALOGS_URL),
    getDialogById: dialogId => apiService.get(`${DIALOGS_URL}/${dialogId}`),
};

export default dialogsService;
