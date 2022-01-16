// imports
import { getWorkspaces } from "@/api/workspace";
import store from "..";

// initial state
const state = () => ({
  // 工作空间
  workspaces: [],
});

// getters
const getters = {
  workspaces(state) {
    return state.workspaces;
  },
};

// mutations
const mutations = {
  SET_WORKSPACES(state, wspaces) {
    state.workspaces = wspaces;
  },
};

// actions
const actions = {
  async changeWorkspace({ dispatch }, { workspaceId }) {
    // 更新用户的 workspaceId
    await store.dispatch("user/changeWorkspace", workspaceId);

    // 更新 Todos
    await store.dispatch("todos/getTodos");
  },

  // 获取用户的 workspaces
  list({ commit }) {
    console.log("workspace/list actions...");
    // 获取 workspaces
    getWorkspaces().then((resp) => {
      commit("SET_WORKSPACES", resp);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
