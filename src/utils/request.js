import axios from "axios";

const VUE_APP_API_URL = process.env.VUE_APP_BASE_API || `${location.origin}`;

const service = axios.create({
  baseURL: VUE_APP_API_URL + "/api",
  timeout: 60000, // 过期时间
});

// request interceptor
service.interceptors.request.use(
  (request) => {
    // 请求头
    console.log(request.method);

    // 发送请求之前做的
    // const token = !store.getters.token?sessionStorage.getItem('token'):store.getters.token;
    // if (token) {
    //   request.headers['Authori-zation'] = token
    // }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status === 401) {
      // to re-login
      console.log("返回码 401 鉴权失败, 需要重新登录");
    }
    if (response.status !== 200 && response.status !== 401) {
      console.log("service.interceptors.response: ", res);
      return Promise.reject();
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
  }
);

export default service;
