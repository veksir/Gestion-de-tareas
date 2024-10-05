import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL para todas las solicitudes

// Login
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data)); // Guarda el token
  }
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('user'); // Elimina el usuario del localStorage
};

// Obtener el usuario actual
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr); // Retorna el usuario si existe
  return null;
};

// Obtener headers de autenticación
const getAuthHeaders = () => {
  const currentUser = getCurrentUser();
  const token = currentUser ? currentUser.token : "";
  return { Authorization: `Bearer ${token}` }; // Retorna el header con el token
};

// Realizar solicitudes autenticadas
const requestWithAuth = async (method, url, data = {}) => {
  const headers = getAuthHeaders(); // Obtiene los headers
  const response = await axios({
    method,
    url: `${API_URL}${url}`, // URL completa
    data,
    headers, // Incluye los headers con el token
  });
  return response;
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  requestWithAuth,
};

export default AuthService;
