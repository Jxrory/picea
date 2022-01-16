// imports
import { getWorkspaces } from "@/api/workspace";
import todos from "./todos";
import user from "./user";

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
  async changeWorkspace({ state, commit }, { workspaceId }) {
    // 更新用户的 workspaceId
    await user.actions.changeWorkspace({ state, commit }, workspaceId);

    // 更新 Todos
    todos.actions.getTodos({ state, commit });
  },

  // 获取用户的 workspaces
  list({ state, commit }) {
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
