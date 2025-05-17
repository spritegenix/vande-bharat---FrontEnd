// src/lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fluent-similarly-shrimp.ngrok-free.app',
  withCredentials: true,
});

export default axiosInstance;
