import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Adjust if your backend port or base path is different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
