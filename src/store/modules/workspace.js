// imports

// initial state
const state = () => ({
  // 当前工作空间
  workspace: {},
  // 工作空间
  workspaces: [],
});

// getters
const getters = {};

// mutations
const mutations = {
  CHANGE_CHOOSE_SPACE(state, val) {
    state.showSeachCenter = val;
  },
};

// actions
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
