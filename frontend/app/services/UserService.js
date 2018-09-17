import apiService from './ApiService';
import { USER_URL } from '../constants/ServicesURLConstants';

const userService = {
    login: (email, password) => apiService.post(USER_URL, { email, password }),
    getUserInfo: () => apiService.get(USER_URL),
};

export default userService;

