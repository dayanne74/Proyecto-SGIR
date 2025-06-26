import axios from 'axios';

const API_URL = import.meta.env.VITE_API;  // https://proyecto-sgir.onrender.com/api

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ▶️ Interceptor para inyectar el token en todas las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;