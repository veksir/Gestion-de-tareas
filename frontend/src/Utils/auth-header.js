import AuthService from './AuthService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default axiosInstance;