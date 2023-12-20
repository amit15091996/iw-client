import axios from "axios";


const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const getReqAxios = axios.create({
    baseURL: `${BASE_URL}`
})

getReqAxios.interceptors.request.use(
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

getReqAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);