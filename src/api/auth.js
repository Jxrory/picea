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
