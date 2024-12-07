import axios from 'axios';

// Configuración base para las peticiones
const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto a la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
