import axios from 'axios';
import apiURL from '../api';

const getOwnerList = () => {
    return axios.get(`${apiURL}/Owner/GetOwnerList`).then(res => res.data);
}
const getOwnerById = (ownerId) => {
    return axios.get(`${apiURL}/Owner/GetOwnerById/${ownerId}`).then(res => res.data);
}
const addOwner = (ownerObj) => {
    return axios.post(`${apiURL}/Owner/AddOwner`, ownerObj).then(res => res.data);
}
const updateOwner = (ownerId, ownerObj) => {
    return axios.put(`${apiURL}/Owner/UpdateOwner/${ownerId}`, ownerObj).then(res => res.data);
}
const deleteOwner = (ownerId) => {
    return axios.delete(`${apiURL}/Owner/DeleteOwner/${ownerId}`).then(res => res.data);
}


export {
    getOwnerList,
    getOwnerById,
    addOwner,
    updateOwner,
    deleteOwner
}
