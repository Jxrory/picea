// imports
import jwtDecode from "jwt-decode";

import { login, getUserInfo, updateUserInfo } from "@/api/user";

// token 获取失败需要跳转到登录页面
import router from "@/router";

// initial state
const state = () => ({
  /* 用户信息 */
  user: {},

  /* token */
  token: "",
});

// getters
const getters = {
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

    if (token && token !== "") {
      commit("SET_TOKEN", token || "");
      return prefixToken + state.token;
    }

    // 跳转至登录页面
    router.replace("/login");
  },

  /**
   * 获取用户Id
   *  1. store user getters 中获取, 如果存在就返回
   *  2. 从 token 获取
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
   * 获取用户信息, 如果 store 用户不存在使用token从后台获取
   *
   * @returns user info
   */
  async getUser({ state, commit }) {
    const user = state.user;
    if (user && user.uid && user.uid !== "") {
      return user;
    }

    const uid = actions.getUserId({ state, commit });

    const userResp = await getUserInfo(uid);
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
    try {
      await updateUserInfo(userUpdate);
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
