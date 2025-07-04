// src/lib/authAxios.ts
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export const useAuthAxios = () => {
  const { getToken } = useAuth();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, ''),
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
      if ((config as any)._skipAuth) return config;
    const token = await getToken({ template: 'default' });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => Promise.reject(error));

  return instance;
};
//for s3
export const plainAxios = axios.create({
  withCredentials: false,
});
