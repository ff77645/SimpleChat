import axios from "axios";

const request = axios.create({
    baseURL:'http://localhost:3000/v1',
    timeout:8000,
})


// request.interceptors.request.use(config=>{
    
// },err=>{

// })

request.interceptors.response.use(response=>response.data,error=>{
    const msg = error?.response?.data 
    return Promise.reject(msg || error.toStrin())
})


export default request