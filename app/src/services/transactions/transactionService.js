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

//add a transaction
export const addTransactionAPI = async (data) => {
    const response = await api.post(`/transaction/create`, data);
    return response.data;
}

//List all transactions
export const listTransactionAPI = async () => {
    try {
        const response = await api.get('/transaction/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}

//List all transactions with filters
export const listTransactionWithFiltersAPI = async (filters) => {
    const response = await api.get('/transaction/lists', {
        params: filters,
    });
    return response.data;
};

//Update a transaction
export const updateTransactionAPI = async (id, data) => {
    try {
        const response = await api.put(`/transaction/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
};


//Get total amount
export const totalAmountAPI = async (filters) => {







    try {
        const response = await api.get(`/transaction/totalAmount`, {
            params: filters
        });
        return response.data.totalAmount;
    } catch (error) {
        console.error('Error fetching total amount:', error);
        throw error;
    }
};

//Print transaction
export const printTransactionAPI = async (id) => {







    try {
        const response = await api.get(`/transaction/print/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error printing transaction:', error);
        throw error;
    }
};
