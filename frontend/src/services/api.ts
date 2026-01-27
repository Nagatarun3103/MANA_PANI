import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// request: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response: handle 401 / invalid token
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // invalid token: clear storage and redirect to login
      localStorage.removeItem('auth_token');
      // optional: clear context via window.dispatchEvent or a global handler
      try { window.location.assign('/login'); } catch (e) { /* ignore */ }
    }
    return Promise.reject(err);
  }
);

export default api;