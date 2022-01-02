/**
 * 接口使用统一格式, 后端使用 RESTful 格式:
 *  {
 *    method: 'GET',    // 操作方式
 *    url: '/todos',    // 资源路径
 *    params: data      // 数据
 *  }
 */
import persistencer from "./persistencer";

/**
 * 添加 todo item
 *
 * @param {*} params
 */
export function addTodoItem(data) {
  return persistencer({
    method: "post",
    url: "/todos",
    data: data,
  });
}

export function getAll(params) {
  return persistencer({
    method: "GET",
    url: "/todos",
    params: params,
  });
}
