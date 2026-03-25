import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from '@/lib/env';
import { getAccessToken, setAccessToken } from '@/lib/auth-token';

const api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
=======
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
>>>>>>> e7e14a01f4482de08f6f0f9abaec1c46daba15f2
});

let isRefreshing = false;
let queuedRequests: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queuedRequests.forEach((callback) => callback(token));
  queuedRequests = [];
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes('/refresh')) {
      setAccessToken(null);
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queuedRequests.push((token) => {
          if (!token) {
            reject(error);
            return;
          }

          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await refreshClient.post<{ token: string }>('/refresh', {});
      const newToken = refreshResponse.data.token;

      setAccessToken(newToken);
      resolveQueue(newToken);

      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      resolveQueue(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
