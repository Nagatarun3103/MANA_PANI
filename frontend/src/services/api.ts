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
      // The AuthContext handles token removal and state updates.
      // Dispatch a global event that the AuthContext is listening for.
      window.dispatchEvent(new Event('logout-event'));
    }
    return Promise.reject(err);
  }
);

export default api;