import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mana-pani.onrender.com', // Adjust if your backend port or base path is different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
