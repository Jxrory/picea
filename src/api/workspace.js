import store from "@/store";
import request from "@/utils/request";

async function getUserId() {
  return await store.dispatch("user/getUserId");
}

/**
 * 新增 workspace
 *
 * @param {*} data workspace data
 */
export async function addWorkspace(data) {
  const userId = await getUserId();
  return request({
    method: "POST",
    url: "/" + userId + "/workspaces",
    data: data,
  });
}

/**
 * 更新 workspace
 *
 * @param {String} workspaceId 用户Id
 * @param {*} data workspace data
 */
export async function updateWorkspace(workspaceId, data) {
  const userId = await getUserId();
  return request({
    method: "PUT",
    url: "/" + userId + "/workspaces/" + workspaceId,
    data: data,
  });
}

/**
 * 获取 workspaces
 *
 */
export async function getWorkspaces() {
  const userId = await getUserId();
  return request({
    method: "GET",
    url: "/" + userId + "/workspaces",
  });
}
