import axios from "axios";
import { BASE_URL } from "../constants/Appconfig";

const http = axios.create({
    "baseURL": BASE_URL,
    "headers": {
        "Content-Type": 'application/json'
    },
    "timeout": 10000,
});

http.interceptors.response.use(
    function(response){
        return response;
    },
    async(error:any)=>{
        try {
            if (error.response.status===401){
                sessionStorage.removeItem('access');
                window.localStorage.reload();
                return;
            }
            throw new Error("unhandle error!");
        } catch (err){
            return Promise.reject(error);
        }
    }
);

export default http;
