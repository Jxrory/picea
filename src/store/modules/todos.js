// imports

//////// todo item 状态 ////////
const TODO_ITEM_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
};

//////// todo item label ////////
const TODO_ITEM_LABEL = {
  A: "a",
  B: "b",
  C: "c",
  D: "d",
};

// initial state
// shape:
//
// NOTICE: __idx 是由前端生成的, 指代 list 的索引
const state = () => ({
  list: [
    {
      __idx: 0,
      label: "a",
      start: 1639567447,
      end: 0,
      no: "61b893effda33d1560585a1e",
      tag: "",
      title: "梳理还款逻辑",
      projectId: "",
      status: 1,
      order: 100000,
    },
    {
      __idx: 1,
      label: "b",
      start: 1639789058,
      end: 0,
      no: "61bd3202f607a45f386456a8",
      tag: "",
      title: "【TODO】Body页面绘制-拖拽功能",
      projectId: "",
      status: 0,
      order: 1639789058,
    },
    {
      __idx: 2,
      label: "b",
      start: 1639789051,
      end: 0,
      no: "61bd31fbf607a45f386456a7",
      tag: "",
      title: "【TODO】Body页面绘制-item绘制",
      projectId: "",
      status: 0,
      order: 1639789051,
    },
    {
      __idx: 3,
      label: "d",
      start: 1639788896,
      end: 0,
      no: "61bd3160f607a45f386456a5",
      tag: "",
      title: "【TODO】保存Title输入的数据",
      projectId: "",
      status: 0,
      order: 100000,
    },
  ],
  // 四个象限配置数据
  quadrantsConfig: [
    {
      label: TODO_ITEM_LABEL.A,
      labelDetail: "重要且紧急",
    },
    {
      label: TODO_ITEM_LABEL.B,
      labelDetail: "重要不紧急",
    },
    {
      label: TODO_ITEM_LABEL.C,
      labelDetail: "紧急不重要",
    },
    {
      label: TODO_ITEM_LABEL.D,
      labelDetail: "不重要不紧急",
    },
  ],
});

// getters
const getters = {
  // 根据象限 label 获取 todoList
  getListByLabel: (state) => (label) => {
    return state.list.filter((todo) => todo.label === label);
  },

  // 获取象限配置数据
  getQuadrantsConfig: (state) => {
    return state.quadrantsConfig;
  },
};

// mutations
const mutations = {
  CREATE: (state, item) => {
    state.list.push(item);
  },

  UPDATE_VALUE_BY__IDX: (state, { __idx, key, value }) => {
    if (state.list.length <= __idx) {
      console.error(
        "UPDATE_VALUE_BY__IDX index out of range!!! __idx=" + __idx
      );
      return;
    }
    state.list[__idx][key] = value;
    console.log(state.list[__idx]);
  },
};

// actions
const actions = {
  // 在象限头部添加的简单 TODO item
  createSimple({ state, commit }, { label, title }) {
    const time = Math.round(Date.now());
    commit("CREATE", {
      __idx: state.list.length,
      label: label,
      start: time,
      end: 0,
      no: "",
      tag: "",
      title: title,
      projectId: "",
      status: 0,
      order: time,
    });
  },

  // 更新 label
  updateLabel: ({ commit }, { __idx, label }) => {
    commit("UPDATE_VALUE_BY__IDX", { __idx, key: "label", value: label });
  },
  // 更新 status
  done: ({ commit }, __idx) => {
    commit("UPDATE_VALUE_BY__IDX", {
      __idx,
      key: "status",
      value: TODO_ITEM_STATUS.DONE,
    });
  },
  reopen: ({ commit }, __idx) => {
    commit("UPDATE_VALUE_BY__IDX", {
      __idx,
      key: "status",
      value: TODO_ITEM_STATUS.UNDO,
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
