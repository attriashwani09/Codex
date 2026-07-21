import axios from "axios" ; 

const axiosClent = axios.create({
    baseURL : 'http://localhost:5000' , 
    withCredentials : true , 
    headers : {
        "Content-Type" : 'application/json'
    }
}) 

export default axiosClent ;