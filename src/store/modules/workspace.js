// imports
import { getWorkspaces } from "@/api/workspace";
import store from "..";

// initial state
const state = () => ({
  // 当前工作空间
  workspace: {},
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
  CHANGE_WORKSPACE(state, workspaceId) {
    const wss = state.workspaces.find((item) => item.uid === workspaceId);
    if (wss.size > 0) {
      state.workspace = wss[0];
    }
  },
  SET_WORKSPACES(state, wspaces) {
    state.workspaces = wspaces;
  },
};

// actions
const actions = {
  async changeWorkspace({ state, commit }, { workspaceId }) {
    commit("CHANGE_WORKSPACE", workspaceId);
    // 更新用户的 workspaceId
    await store.dispatch("user/changeWorkspace", workspaceId);

    // 更新 Todos
    store.dispatch("todos/getTodos");
  },

  // 获取用户的 workspaces
  list({ state, commit }) {
    // 获取workspaces
    getWorkspaces().then((resp) => {
      console.log("store list getWorkspaces resp: ", resp);
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
