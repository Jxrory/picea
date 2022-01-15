import request from "@/utils/request";

/**
 * 登录
 *
 * @param {*} data
 */
export function login(data) {
  return request({
    method: "POST",
    url: "/auth/login",
    data: data,
  });
}

/**
 * 获取用户信息
 *
 * @param {String} uid 用户id
 * @returns
 */
export function getUserInfo(uid) {
  return request({
    method: "GET",
    url: "/users/" + uid,
  });
}
