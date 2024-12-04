import axios from 'axios';
import { useToken } from '@/hooks/useToken';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/api',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const { getIdToken } = useToken();
        const token = await getIdToken();

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