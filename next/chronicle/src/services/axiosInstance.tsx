"use client";

import axios from 'axios';
import { getToken } from '@/services/tokenService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/api',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken(true);

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
