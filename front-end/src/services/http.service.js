import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

const httpService = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

httpService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpService;
