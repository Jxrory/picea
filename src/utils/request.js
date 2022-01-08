import "element-plus/es/components/message/style/css";

import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";

const VUE_APP_API_URL = process.env.VUE_APP_BASE_API || `${location.origin}`;

const service = axios.create({
  baseURL: VUE_APP_API_URL + "/api",
  timeout: 60000, // 过期时间
});

// request interceptor
service.interceptors.request.use(
  (request) => {
    // 发送请求之前做的
    const bearer = store.dispatch("user/getBearerToken");
    if (bearer) {
      request.headers["Authorization"] = bearer;
    }
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
    // console.log("request.js response error:", error.response);
    const resp = error.response;
    switch (resp?.status) {
      case 401: // Unauthorized
        // re-login
        break;
      case 400: // Bad Request
      case 417: // Expectation Failed (业务异常)
        ElMessage({ showClose: true, message: resp.data, type: "error" });
        break;
      default:
        console.log(error);
        break;
    }
    return Promise.reject(error);
  }
);

export default service;
