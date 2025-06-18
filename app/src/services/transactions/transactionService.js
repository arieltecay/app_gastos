import axios from 'axios';
import { BASE_URL_PROD } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

// Crear una instancia de axios con configuración común
const api = axios.create({
  baseURL: BASE_URL_PROD
});

// Interceptor para agregar el token en cada request
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
  if (token) {
    config.headers['x-auth-token'] = `Bearer ${token}`;
  }
  return config;
});

//get the token
const token = getUserFromStorage();

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


export const totalAmountAPI = async (filters) => {
    const response = await fetch(`${BASE_URL_PROD}/transaction/totalAmount?startDate=${filters.startDate}&endDate=${filters.endDate}&type=${filters.type}&category=${filters.category}`, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    const data = await response.json();
    return data.totalAmount;
};

export const printTransactionAPI = async (id) => {
    const response = await fetch(`${BASE_URL_PROD}/transaction/print/${id}`, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    const data = await response.json();
    return data;
};
