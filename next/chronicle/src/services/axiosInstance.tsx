import axios from 'axios';
import { getToken } from '@/services/tokenService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/api',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // Get the token outside of React hooks
        const token = await getToken(true); // Force refresh if needed

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
