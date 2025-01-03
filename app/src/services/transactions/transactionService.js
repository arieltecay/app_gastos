import axios from 'axios';
import { BASE_URL_PROD } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

//get the token
const token = getUserFromStorage();
//add a transaction
export const addTransactionAPI = async (data) => {
    const response = await axios.post(`${BASE_URL_PROD}/transaction/create`, data, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
}

//List all transactions
export const listTransactionAPI = async () => {
    const response = await axios.get(`${BASE_URL_PROD}/transaction/all`, {
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
}

//List all transactions with filters
export const listTransactionWithFiltersAPI = async (filters) => {
    const response = await axios.get(`${BASE_URL_PROD}/transaction/lists`, {
        params: filters,
        headers: {
            'x-auth-token': 'Bearer ' + token,
        },
    });
    return response.data;
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
