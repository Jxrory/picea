// imports
import jwtDecode from "jwt-decode";

import { login, getUserInfo, updateUserInfo } from "@/api/user";

// initial state
const state = () => ({
  /* 用户信息 */
  user: {},

  /* token */
  token: "",
});

// getters
const getters = {
  workspace(state) {
    return state.user.workspaceId;
  },
  user(state) {
    return state.user;
  },
  userId(state) {
    return state.user.uid;
  },
};

// mutations
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  SET_USER(state, user) {
    state.user = user;
  },
};

// actions
const actions = {
  /**
   * 登录
   *  1. 请求后端, 获取token
   *  2. 保存到本地 localstage
   *
   * @param {String} username 用户名
   * @param {String} password 密码
   * @returns
   */
  async login({ state, commit }, { username, password }) {
    try {
      const resp = await login({ username, password });

      console.log("store actions login resp: ", resp);

      if (resp.token != "") {
        commit("SET_TOKEN", resp.token);
        localStorage.setItem("AuthorizationToken", resp.token);
        commit("SET_USER", resp.user);
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      console.log("store actions login err: ", err);
      return { success: false, ...err?.response?.data };
    }
  },

  /**
   * 登录成功 Hook
   */
  async loginSuccessHook({ state, commit }) {
    // 获取用户信息
    await actions.getUser({ state, commit });
  },

  /**
   * 获取 bearer token
   *
   * @returns token
   */
  getBearerToken({ state, commit }, { isNotBearer = false } = {}) {
    const prefixToken = isNotBearer ? "" : "Bearer ";

    if (state.token) {
      return prefixToken + state.token;
    }

    const token = localStorage.getItem("AuthorizationToken");

    commit("SET_TOKEN", token || "");
    return prefixToken + state.token;
  },

  /**
   * 获取用户Id
   *
   * @returns String 用户Id
   */
  getUserId({ state, commit }) {
    const userId = getters.userId(state);
    if (userId && userId !== "") {
      return userId;
    }

    // 获取 token 解析出 用户Id
    const token = actions.getBearerToken(
      { state, commit },
      { isNotBearer: true }
    );
    const content = jwtDecode(token);
    return content.aud;
  },

  /**
   * 获取用户信息, 如果 store 用户不存在回去后台刷新获取
   *
   * @returns user info
   */
  async getUser({ state, commit }) {
    const user = state.user;
    if (user.uid && user.uid !== "") {
      return user;
    }

    const uid = actions.getUserId({ state, commit });

    const userResp = await getUserInfo(uid);
    console.log("loginSuccessHook getUserInfo user: ", userResp);
    commit("SET_USER", userResp);
    return state.user;
  },

  /**
   * 改变工作空间
   *
   * @param {string} workspaceId 工作空间Id
   */
  async changeWorkspace({ state, commit }, workspaceId) {
    const user = await actions.getUser({ state, commit });
    const userUpdate = JSON.parse(JSON.stringify(user));
    userUpdate.workspaceId = workspaceId;
    console.log("changeWorkspace user:", state);
    try {
      const resp = await updateUserInfo(userUpdate);
      console.log("updateUserInfo resp:", resp);
      commit("SET_USER", userUpdate);
    } catch (error) {
      console.log("store user changeWorkspace", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
