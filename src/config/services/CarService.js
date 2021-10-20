import axios from "axios";
import apiURL from "../api";

//-------//CRUD işlemleri-------//

//Read : Get (Get by Id, Get All List)


//Tüm araçları getirir
const getCarList = () => {
    return axios.get(`${apiURL}/Car/GetCarList`).then(res => res.data);
}

//Araç id'sine göre getir
const getCarById = (carId) => {
    return axios.get(`${apiURL}/Car/GetCarById/${carId}`).then(res => res.data)
}

//Create : Add

const addCar = (carObj) => {
    return axios.post(`${apiURL}/Car/AddCar`, carObj).then(res => res.data)
}

//Update
const updateCar = (carId, carObj) => {
    return axios.put(`${apiURL}/Car/UpdateCar/${carId}`, carObj).then(res => res.data)
}

//Delete

const deleteCar = (carId) => {
    return axios.delete(`${apiURL}/Car/DeleteCar/${carId}`).then(res => res.data)
}


export {
    getCarList,
    getCarById,
    addCar,
    updateCar,
    deleteCar
}