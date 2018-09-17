import { fetchWrapper, RequestParamsFactory } from '../utils/FetchUtils';

const apiService = {
    get: url => fetchWrapper(url, RequestParamsFactory.GET()),
    post: (url, payload) => fetchWrapper(url, RequestParamsFactory.POST(payload)),
    put: (url, payload) => fetchWrapper(url, RequestParamsFactory.PUT(payload)),
    delete: url => fetchWrapper(url, RequestParamsFactory.DELETE()),
};

export default apiService;
