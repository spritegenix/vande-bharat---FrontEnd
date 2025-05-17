// src/lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://traditional-boating-cw-visited.trycloudflare.com',
  withCredentials: true,
});

export default axiosInstance;
