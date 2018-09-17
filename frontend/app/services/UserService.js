import apiService from './ApiService';
import { USER_URL } from '../constants/ServicesURLConstants';

const userService = {
    login: (email, passwd) => apiService.post(USER_URL, { email, passwd }),
    getUserInfo: () => apiService.get(USER_URL),
};

export default userService;

