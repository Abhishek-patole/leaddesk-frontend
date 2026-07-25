import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// Extend AxiosRequestConfig to include our custom retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true, // Crucial for sending/receiving HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Only intercept 401 Unauthorized errors from our own endpoints that aren't the refresh or login endpoints themselves
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== '/api/auth/refresh' &&
      originalRequest.url !== '/api/auth/login'
    ) {
      if (isRefreshing) {
        // If we're already refreshing, queue this request
        try {
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // We are the first 401 request, lock the refreshing state
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/api/auth/refresh');
        
        // Refresh was successful, process queued requests
        isRefreshing = false;
        processQueue(null);

        // Retry original request
        return api(originalRequest);
      } catch (err) {
        // Refresh failed (e.g. refresh token expired/missing)
        isRefreshing = false;
        processQueue(err);
        
        // If refresh fails, we will handle logout implicitly inside the AuthContext
        // by catching this rejection when we try to fetch protected data.
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
