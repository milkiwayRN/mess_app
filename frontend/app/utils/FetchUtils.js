import userStorage from './SessionUserStorage';
import FETCH_TYPES from '../constants/FetchTypes';

export function setUpHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    };
    const userInfo = userStorage.data;
    if (userInfo) {
        headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return headers;
}

export const RequestParamsFactory = {
    GET: () => ({
        method: FETCH_TYPES.get,
        credentials: 'include',
        headers: setUpHeaders(FETCH_TYPES.get),
    }),

    POST: (payload = {}) => ({
        method: FETCH_TYPES.post,
        body: JSON.stringify(payload),
        dataType: 'json',
        credentials: 'include',
        headers: setUpHeaders(FETCH_TYPES.post),
    }),

    PUT: payload => ({
        method: FETCH_TYPES.put,
        body: JSON.stringify(payload),
        dataType: 'json',
        credentials: 'include',
        headers: setUpHeaders(FETCH_TYPES.put),
    }),

    DELETE: () => ({
        method: FETCH_TYPES.delete,
        credentials: 'include',
        headers: setUpHeaders(FETCH_TYPES.delete),
    }),

};

export function fetchWrapper(url, params) {
    return fetch(url, params)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                throw new Error(res.statusText);
            }
        });
}
