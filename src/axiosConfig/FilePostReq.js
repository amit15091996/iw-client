import axios from "axios";


const BASE_URL = "http://118.91.190.44:3399/api/v1";

export const postReqAxios = axios.create({
    baseURL: `${BASE_URL}`
})

postReqAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("token")
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