import axios from "axios";
import { getToken } from "../user/services/UserService";

<<<<<<< HEAD
export const BASE_URL = "http://192.168.0.108:9190/api/v1";
=======
export const BASE_URL = "http://10.0.0.83:9190/api/v1";
>>>>>>> a32110b9f0982d4f1900323d90a986f61e76dba6

export const postReqAxios = axios.create({
    baseURL: `${BASE_URL}`
})

postReqAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
            config.headers['Content-Type'] = 'application/json'
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
 
postReqAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);