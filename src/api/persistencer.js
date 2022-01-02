// API 持久化到后端服务或者本地

let persistencer;

// 使用后端服务
import service from "@/utils/request";

persistencer = service;

// 本地服务 TODO(jx)

export default persistencer;
