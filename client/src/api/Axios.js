import axios from "axios";


export const Axios = axios.create({
    baseURL:'http://localhost:8000/api/',
    withCredentials:true
})
axios.defaults.withCredentials = true
export const api = axios.create({
    baseURL:'http://localhost:8000/api/'
})
export const privateAxios = axios.create({
    baseURL:'http://localhost:8000/api/',
    withCredentials:true
})