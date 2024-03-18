import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

const authRequestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = storage.getToken();
  console.log('axios token', token);
  console.log('axios base', API_URL);
  config.headers = config.headers ?? {};
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log('axios error bad bad', message);

    return Promise.reject(error);
  }
);