// src/api.ts
import axios from 'axios';

// Quitamos el baseURL de localhost:8080. 
// Ahora Axios apuntará a nuestro propio frontend (5173) y Vite hará la magia.
const api = axios.create(); 

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;