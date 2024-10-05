// frontend/src/redux/axiosInstance.js
import axios from 'axios';
import store from './store'; // Asegúrate de exportar tu store correctamente

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.5:5000', // URL base de tu backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las cabeceras de las solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.userInfo?.token; // Asumiendo que el token está en userInfo.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
