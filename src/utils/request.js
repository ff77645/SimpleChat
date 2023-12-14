import axios from "axios";
import {BASE_URL} from '../config/config'

const request = axios.create({
    baseURL:BASE_URL,
    timeout:8000,
})


// request.interceptors.request.use(config=>{
    
// },err=>{

// })

request.interceptors.response.use(response=>response.data,error=>{
    // const msg = error?.response?.data 
    console.log({error});
    return Promise.resolve({
        success:false
    })
})


export default request