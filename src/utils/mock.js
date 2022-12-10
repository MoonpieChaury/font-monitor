import axios from "axios";
import async from "async";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

const service = axios.create({
  baseURL: "/mock",
  timeout: 2000,
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
      return config;
    }
  },
  (error) => {
    console.log(error, "api error");
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => response.data,
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
