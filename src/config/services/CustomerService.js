import axios from 'axios';
import apiURL from '../api';

const getCustomerList = () => {
    return axios.get(`${apiURL}/Customer/GetCustomerList`).then(res => res.data);
}

const getCustomerById = (customerId) => {
    return axios.get(`${apiURL}/Customer/GetCustomerById/${customerId}`).then(res => res.data);
}

const addCustomer = (customerObj) => {
    return axios.post(`${apiURL}/Customer/AddCustomer`, customerObj).then(res => res.data);
}

const updateCustomer = (customerId, customerObj) => {
    return axios.put(`${apiURL}/Customer/UpdateCustomer/${customerId}`, customerObj).then(res => res.data);
}

const deleteCustomer = (customerId) => {
    return axios.delete(`${apiURL}/Customer/DeleteCustomer/${customerId}`).then(res => res.data);
}

export {
    getCustomerList,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
}