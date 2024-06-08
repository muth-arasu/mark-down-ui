import axios from 'axios'

const EditAxios = axios.create({
    baseURL:`http://localhost:7000`,
    headers:{
        'Content-Type':"multi-part/form-data",
    }
})

EditAxios.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('token')
    if(token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

export default EditAxios