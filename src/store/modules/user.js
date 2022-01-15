// imports
import jwtDecode from "jwt-decode";

import { login, getUserInfo } from "@/api/user";

// initial state
const state = () => ({
  /* 当前的工作空间 */
  workspace: "DEFAULT",

  /* 用户信息 */
  user: {},

  /* token */
  token: "",
});

// getters
const getters = {
  workspace(state) {
    return state.workspace;
  },
  user(state) {
    return state.user;
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
    // 获取 token 解析出 用户Id
    const token = actions.getBearerToken(
      { state, commit },
      { isNotBearer: true }
    );
    const content = jwtDecode(token);
    console.log("loginSuccessHook jwtDecode contetn: ", content);
    const uid = content.aud;

    // 获取用户信息
    console.log("loginSuccessHook getUserInfo uid: ", uid);
    const user = await getUserInfo(uid);
    console.log("loginSuccessHook getUserInfo user: ", user);
    commit("SET_USER", user);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
