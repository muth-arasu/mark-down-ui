import axios from 'axios'
import dotenv from 'dotenv'

const AxiosService = axios.create({
    baseURL:`http://localhost:8080`,
    headers:{
        'Content-Type':"application/json",
    }
})

AxiosService.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('token')
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

export default AxiosService