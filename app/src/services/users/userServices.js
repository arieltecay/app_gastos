import axios from 'axios';
import { BASE_URL_PROD } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// Crear una instancia de axios con configuración común
const api = axios.create({
  baseURL: BASE_URL_PROD
});

// Interceptor para agregar el token en cada request
api.interceptors.request.use((config) => {
  const token = getUserFromStorage();
  if (token) {
    config.headers['x-auth-token'] = `Bearer ${token}`;
  }
  return config;
});

//login
export const loginAPI = async ({ email, password }) => {
  const response = await api.post(`/users/login`, {
    email,
    password,
  });
  //Return a promise
  return response.data;
};

//register
export const registerAPI = async ({ email, password, username }) => {
  const response = await api.post(`/users/register`, {
    email,
    password,
    username,
  });
  //Return a promise
  return response.data;
}

//change password
export const changePasswordAPI = async (newPassword) => {
  const response = api.put(`/users/change-password`, {
    newPassword,
  });
  //Return a promise
  return response.data;
}

//update user profile
export const updateUserProfileAPI = async ({ username, email }) => {
  const response = await api.put(`/users/update-profile`, {
    username,
    email,
  });
  //Return a promise
  return response.data;
}
