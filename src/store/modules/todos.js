// imports

//////// todo item 状态 ////////
const TODO_ITEM_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
  DELETED: 9, // 删除
};

const SUB_TODO_ITEM_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
  DELETED: 9, // 删除
};

const COMMENT_STATUS = {
  UNDO: 0, // 未完成
  DONE: 1, // 完成
  DELETED: 9, // 删除
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
  list: [],
  // 四个象限配置数据
  quadrantsConfig: [
    {
      label: TODO_ITEM_LABEL.A,
      labelDetail: "重要且紧急",
      color: "#f80e15",
    },
    {
      label: TODO_ITEM_LABEL.B,
      labelDetail: "重要不紧急",
      color: "#BF9F03",
    },
    {
      label: TODO_ITEM_LABEL.C,
      labelDetail: "紧急不重要",
      color: "#009fe3",
    },
    {
      label: TODO_ITEM_LABEL.D,
      labelDetail: "不重要不紧急",
      color: "#79aa1c",
    },
  ],
});

// getters
const getters = {
  // 根据象限 label 获取 todoList
  getListByLabel: (state) => (label) => {
    return state.list.filter(
      (todo) => todo.status !== TODO_ITEM_STATUS.DELETED && todo.label === label
    );
  },

  // 获取象限配置数据
  getQuadrantsConfig: (state) => {
    return state.quadrantsConfig;
  },
  getQuadrantConfigByLable: (state) => (label) => {
    return state.quadrantsConfig.find((conf) => conf.label === label);
  },

  // 获取 subTodos
  getSubTodosByIdx: (state) => (__idx) => {
    return state.list[__idx].subTodos.filter(
      (item) => item.status !== SUB_TODO_ITEM_STATUS.DELETED
    );
  },

  // 获取 comments
  getCommentsByIdx: (state) => (__idx) => {
    if (!state.list[__idx].comments) {
      return [];
    }
    return state.list[__idx].comments.filter(
      (item) => item.status !== COMMENT_STATUS.DELETED
    );
  },
};

// mutations
const mutations = {
  CREATE: (state, todos) => {
    // 拦截: 设置 `__idx` 和 `subTodos`
    const todoList = todos || [];
    for (let i = 0; i < todoList.length; i++) {
      todoList[i]["__idx"] = i;
      todoList[i]["subTodos"] = todoList["subTodos"] || [];
    }
    state.list = todoList;
  },

  UPDATE_VALUE_BY__IDX: (state, { __idx, key, value }) => {
    if (state.list.length <= __idx) {
      console.error(
        "UPDATE_VALUE_BY__IDX index out of range!!! __idx=" + __idx
      );
      return;
    }
    console.log(state.list[__idx]);
    state.list[__idx][key] = value;
  },

  DELETE_BY__IDX: (state, __idx) => {
    // 删除后 `__idx` 会改变, 只改变状态
    // state.list.splice(__idx, 1);
    if (state.list.length <= __idx) {
      console.error("DELETE_BY__IDX index out of range!!! __idx=" + __idx);
      return;
    }
    state.list[__idx]["status"] = TODO_ITEM_STATUS.DELETED;
  },

  ///////////// Sub Todo List /////////////
  ADD_SUB_TODO_ITEM: (state, { __idx, subTodoItem }) => {
    console.log(state.list[__idx]);
    // subTodoItem.id = Date.now(); // NOTICE: id 都一样???
    state.list[__idx].subTodos.push(subTodoItem);
  },
  UPDATE_SUB_TODO_ITEM: (state, { __idx, subTodoItem }) => {
    console.log(state.list[__idx]);
    if (subTodoItem && subTodoItem.id && subTodoItem.id > 0) {
      const subTodoIdx = state.list[__idx].subTodos.findIndex(
        (item) => item.id === subTodoItem.id
      );
      if (subTodoIdx > -1) {
        state.list[__idx].subTodos[subTodoIdx] = subTodoItem;
      }
    }
  },

  ///////////// Comment /////////////
  ADD_COMMENT_ITEM: (state, { __idx, comment }) => {
    if (!state.list[__idx].comments) {
      state.list[__idx].comments = [];
    }
    console.log("__idx: ", __idx, "\tcomments:", state.list[__idx].comments);
    state.list[__idx].comments.push(comment);
  },
};

import { addTodoItem, getAll } from "@/api/todos";

// actions
const actions = {
  ///////////////// todo list /////////////////
  // 在象限头部添加的简单 TODO item FIXME(jx)
  createSimple({ state, commit }, { label, title }) {
    // const time = Math.round(Date.now());
    const todoItem = {
      priority: 1,
      percent: 0,
      seq: 0,
      status: 0,
      related: "START",
      clazz: "PRIVATE",
      geo: "37.386013;-122.082932",

      dtstart: "2022-01-01T01:50:52.000+00:00",
      completed: "2022-01-01T01:50:52.000+00:00",
      due: "2022-01-01T01:50:52.000+00:00",
      created: "2022-01-01T01:50:52.000+00:00",
      updated: "2022-01-01T01:50:52.000+00:00",
      dtstamp: "2022-01-01T01:50:52.000+00:00",

      categories: "APPOINTMENT,EDUCATION",
      location: "Conference Room - F123, Bldg. 002",
      organizer: "jxrory@jxrory.com",
      summary: "我的会议",
      url: "https://www.jxrory.com",
      description: "issac 的描述",
    };
    addTodoItem(todoItem).then((resp) => {
      console.log("createSimple", resp);
      // commit("CREATE", todoItem);
    });
  },

  // 更新提醒时间
  update: ({ commit }, { __idx, key, value }) => {
    commit("UPDATE_VALUE_BY__IDX", { __idx, key, value });
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
  // 更新开始时间和结束时间
  updateStartEnd: ({ commit }, { __idx, start, end }) => {
    if (start > 0) {
      commit("UPDATE_VALUE_BY__IDX", { __idx, key: "start", value: start });
    }
    if (end > 0) {
      commit("UPDATE_VALUE_BY__IDX", { __idx, key: "end", value: end });
    }
  },
  // 更新提醒时间
  updateRemind: ({ commit }, { __idx, remind }) => {
    commit("UPDATE_VALUE_BY__IDX", { __idx, key: "remind", value: remind });
  },

  // 删除一个 todo item
  delete: ({ commit }, __idx) => {
    commit("DELETE_BY__IDX", __idx);
  },

  // 获取 todos
  getTodos: ({ commit }) => {
    // 获取后端数据 TODO(jx)
    const todos = [
      {
        __idx: 0,
        label: "a",
        start: 1639567447,
        end: 0,
        no: "61b893effda33d1560585a1e",
        title: "梳理还款逻辑",
        status: 1,
        order: 100000,
        content: "",
      },
      {
        __idx: 1,
        label: "b",
        start: 1639789058,
        end: 0,
        no: "61bd3202f607a45f386456a8",
        title: "【TODO】Body页面绘制-拖拽功能",
        status: 0,
        order: 1639789058,
        content: "",
      },
      {
        __idx: 2,
        label: "b",
        start: 1639789051,
        end: 0,
        no: "61bd31fbf607a45f386456a7",
        title: "【TODO】Body页面绘制-item绘制",
        status: 0,
        order: 1639789051,
        content: "",
      },
      {
        __idx: 3,
        label: "d",
        start: 1639788896,
        end: 0,
        no: "61bd3160f607a45f386456a5",
        title: "【TODO】保存Title输入的数据",
        status: 0,
        order: 100000,
        content: "",
      },
    ];

    // 请求后端数据
    getAll({ test: "t" }).then((resp) => {
      console.log(resp);
    });

    // 更新数据
    commit("CREATE", todos);
  },

  //////////////// sub todos ////////////////
  createSubTodos: ({ commit }, { __idx, subTodoItem }) => {
    commit("ADD_SUB_TODO_ITEM", { __idx, subTodoItem });
  },
  getSubTodos: ({ state, commit }, __idx) => {
    // const subTodos = [];
    // commit("UPDATE_VALUE_BY__IDX", { __idx, key: "subTodos", value: subTodos });
  },
  updateSubTodoItem: ({ commit }, { __idx, subTodoItem }) => {
    commit("UPDATE_SUB_TODO_ITEM", { __idx, subTodoItem });
  },
  doneSubTodoItem: ({ commit }, { __idx, subTodoItem }) => {
    const tmpSubTodoItem = JSON.parse(JSON.stringify(subTodoItem));
    tmpSubTodoItem.status = SUB_TODO_ITEM_STATUS.DONE;
    commit("UPDATE_SUB_TODO_ITEM", { __idx, subTodoItem: tmpSubTodoItem });
  },
  reopenSubTodoItem: ({ commit }, { __idx, subTodoItem }) => {
    const tmpSubTodoItem = JSON.parse(JSON.stringify(subTodoItem));
    tmpSubTodoItem.status = SUB_TODO_ITEM_STATUS.UNDO;
    commit("UPDATE_SUB_TODO_ITEM", { __idx, subTodoItem: tmpSubTodoItem });
  },
  deleteSubTodoItem: ({ commit }, { __idx, subTodoItem }) => {
    const tmpSubTodoItem = JSON.parse(JSON.stringify(subTodoItem));
    tmpSubTodoItem.status = SUB_TODO_ITEM_STATUS.DELETED;
    commit("UPDATE_SUB_TODO_ITEM", { __idx, subTodoItem: tmpSubTodoItem });
  },

  //////////////// comments ////////////////
  addComment: ({ commit }, { __idx, comment }) => {
    console.log("addComment: ", comment);
    commit("ADD_COMMENT_ITEM", { __idx: __idx, comment: comment });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
