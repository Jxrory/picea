// imports

// initial state
const state = () => ({
  // 显示搜索中心
  showSeachCenter: false,
});

// getters
const getters = {
  getshowSeachCenter: (state) => {
    return state.showSeachCenter;
  },
};

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
