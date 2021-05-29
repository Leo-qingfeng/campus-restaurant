"use strict"

import axios from "axios"
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let config = {
    // baseURL: "http://127.0.0.1:8081"
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

// 创建Axios对象
const Axios = axios.create(config)

/**
 * 默认携带cookie
 */
Axios.defaults.withCredentials=true;

// 请求拦截器
Axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);

// 响应拦截器
Axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response
    },
    function (error) {
            router.push('/login')
            return Promise.reject(error)
     
    }
);

export default (app) => {
    // 挂载axios到Vue对象
    app.config.globalProperties.$axios = Axios
}
