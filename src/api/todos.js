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
export function addTodoItem(todoItem) {
  return persistencer({
    method: "POST",
    url: "/todos",
    data: todoItem,
  });
}

/**
 * 查询今日相关的 todos
 *
 * @param {Object} params 查询条件
 * @returns todos
 */
export function getToday(params) {
  return persistencer({
    method: "GET",
    url: "/todos/today",
    params: params,
  });
}

/**
 * 删除一个 Todo Item by id
 *
 * @param {String} uid id
 * @returns true or false
 */
export function deleteTodoItem(uid) {
  return persistencer({
    method: "DELETE",
    url: "/todos/" + uid,
  });
}

/**
 * 更新 TODO Item
 *
 * @param {Object} todoItem
 * @returns true | false
 */
export function updateTodoItem(todoItem) {
  return persistencer({
    method: "PUT",
    url: "/todos/" + todoItem.uid,
    data: todoItem,
  });
}
