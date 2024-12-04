import axios from 'axios';
import { useToken } from '@/hooks/useToken';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
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