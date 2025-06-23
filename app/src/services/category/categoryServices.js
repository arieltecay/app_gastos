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

//add category
export const addCategoryAPI = async ({ name, type }) => {
    const response = await api.post(`/category/create`, { name, type });

    return response.data;
};
//list all categories
export const listCategoryAPI = async () => {
    const response = await api.get(`/category/lists`);
    return response.data;
};

//delete category
export const deleteCategoryAPI = async (id) => {
    const response = await api.delete(`/category/delete/${id}`);
    return response.data;
};

//update category
export const updateCategoryAPI = async ({ id, name, type }) => {
    const response = await api.put(`/category/update/${id}`, { name, type });
    return response.data;
};

//get category
export const getCategoryAPI = async (id) => {
    const response = await api.get(`/category/${id}`);
    return response.data;
};
