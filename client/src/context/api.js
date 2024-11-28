import axios from 'axios'
axios.defaults.withCredentials = true
export const api = axios.create({
    baseURL:'http://localhost:8000/api/'
})
export const privateAxios = axios.create({
    baseURL:'http://localhost:8000/api/',
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})