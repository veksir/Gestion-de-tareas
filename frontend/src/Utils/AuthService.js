import axios from "axios";

const API_URL = "http://localhost:5000/api";

const register = async (nombre, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    nombre,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

const requestWithAuth = async (method, url, data = {}) => {
  const user = getCurrentUser();
  if (!user || !user.token) {
    throw new Error("No está autenticado");
  }
  return axios({
    method,
    url: `http://localhost:5000/api${url}`,
    data,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  requestWithAuth,
};

export default AuthService;
