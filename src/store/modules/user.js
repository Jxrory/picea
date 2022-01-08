// imports
import { login } from "@/api/auth";

// initial state
const state = () => ({
  token: "",
});

// getters
const getters = {};

// mutations
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
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
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      console.log("store actions login err: ", err);
      return { success: false, ...err?.response?.data };
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
