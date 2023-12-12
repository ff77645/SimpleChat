import axios from "axios";

const request = axios.create({
    baseURL:'https://summer9.cn',
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