import axios from 'axios';

const API_URL = import.meta.env.VITE_API;
console.log('📌 API baseURL en browser:', API_URL);

export default axios.create({
  baseURL: API_URL,        // → https://proyecto-sgir.onrender.com/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,   // si necesitas cookies/autorización
});