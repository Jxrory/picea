// imports
import {
  TODO_ITEM_STATUS,
  SUB_TODO_ITEM_STATUS,
  COMMENT_STATUS,
  TODO_ITEM_LABEL,
  LABEL_TO_PRIORITY,
  label2priority,
} from "@/common/status";

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
      (todo) =>
        todo.status !== TODO_ITEM_STATUS.CANCELLED &&
        LABEL_TO_PRIORITY[label].indexOf(todo.priority) > -1
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
      (item) => item.status !== SUB_TODO_ITEM_STATUS.CANCELLED
    );
  },

  // 获取 comments
  getCommentsByIdx: (state) => (__idx) => {
    if (!state.list[__idx].comments) {
      return [];
    }
    return state.list[__idx].comments.filter(
      (item) => item.status !== COMMENT_STATUS.CANCELLED
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

  UPDATE_TODO_ITEM_BY__IDX: (state, { __idx, item }) => {
    if (state.list.length <= __idx) {
      console.error(
        "UPDATE_TODO_ITEM_BY__IDX index out of range!!! __idx=" + __idx
      );
      return;
    }

    state.list[__idx] = item;
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
    state.list[__idx]["status"] = TODO_ITEM_STATUS.CANCELLED;
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

import {
  addTodoItem,
  getAll,
  deleteTodoItem,
  updateTodoItem,
} from "@/api/todos";

// actions
const actions = {
  ///////////////// todo list /////////////////
  // 在象限头部添加的简单 TODO item FIXME(jx)
  createSimple({ state, commit }, { label, title }) {
    const nowTime = new Date().toJSON();
    const todoItem = {
      priority: label2priority(label),
      percent: 0,
      seq: 0,
      status: 0,
      related: "START",
      clazz: "PRIVATE",
      geo: "",

      dtstart: nowTime,
      // completed: "",
      // due: "",
      created: nowTime,
      updated: nowTime,
      dtstamp: nowTime,

      categories: "",
      location: "",
      organizer: "",
      summary: title,
      url: "",
      description: "",
    };
    addTodoItem(todoItem).then((resp) => {
      console.log("createSimple", resp);
      // commit("CREATE", todoItem);
    });
  },

  // 更新 todo item
  update: ({ state, commit }, { __idx, key, value }) => {
    const item = JSON.parse(JSON.stringify(state.list[__idx]));

    if (item[key] !== value) {
      item[key] = value;
      updateTodoItem(item).then((resp) => {
        if (resp || false) {
          commit("UPDATE_VALUE_BY__IDX", { __idx, key, value });
        }
      });
    }
  },
  /**
   * 更新TODO Item
   *
   * @param {*} __idx
   * @param {*} data
   */
  updateItem: ({ state, commit }, { __idx, data }) => {
    const item = JSON.parse(JSON.stringify(state.list[__idx]));

    // js 对象 合并
    const newItem = Object.assign(item, data);

    updateTodoItem(newItem).then((resp) => {
      if (resp || false) {
        commit("UPDATE_TODO_ITEM_BY__IDX", { __idx, item: newItem });
      }
    });
  },
  // 更新: 优先级
  updateLabel: ({ state, commit }, { __idx, label }) => {
    console.log("updateLabel __idx: ", __idx, "  label: ", label);
    const item = JSON.parse(JSON.stringify(state.list[__idx]));
    const priority = label2priority(label);
    if (priority === item.priority) {
      return;
    }

    item.priority = priority;
    updateTodoItem(item).then((resp) => {
      if (resp || false) {
        commit("UPDATE_VALUE_BY__IDX", {
          __idx,
          key: "priority",
          value: priority,
        });
      }
    });
  },
  // 更新 status
  done: ({ state, commit }, __idx) => {
    console.log("done __idx: ", __idx);
    return actions.updateItem(
      { state, commit },
      {
        __idx: __idx,
        data: {
          status: TODO_ITEM_STATUS.COMPLETED,
          completed: new Date().toJSON(),
        },
      }
    );
  },
  reopen: ({ state, commit }, __idx) => {
    console.log("reopen __idx: ", __idx);
    return actions.updateItem(
      { state, commit },
      {
        __idx: __idx,
        data: { status: TODO_ITEM_STATUS["IN-PROCESS"] },
      }
    );
  },
  // 更新开始时间和结束时间
  updateStartEnd: ({ state, commit }, { __idx, start, end }) => {
    const item = JSON.parse(JSON.stringify(state.list[__idx]));
    const startChangeFlag = start && start !== "" && start !== item.dtstart;
    const endChangeFlag = end && end !== "" && end !== item.due;

    if (startChangeFlag || endChangeFlag) {
      item.dtstart = start;
      item.due = end;

      return actions.updateItem(
        { state, commit },
        { __idx: __idx, data: item }
      );
    }
  },
  // 更新提醒时间, 新的 TODO 没有提醒 :)
  updateRemind: ({ commit }, { __idx, remind }) => {
    console.log("id: ", __idx, "  remind: ", remind);
    // commit("UPDATE_VALUE_BY__IDX", { __idx, key: "remind", value: remind });
  },

  // 删除一个 todo item
  delete: ({ state, commit }, __idx) => {
    deleteTodoItem(state.list[__idx].uid).then((resp) => {
      if (resp || false) {
        // 前端临时删除, 等待重新请求数据后刷新
        commit("DELETE_BY__IDX", __idx);
      }
    });
  },

  // 获取 todos
  getTodos: ({ commit }) => {
    // 请求后端数据
    getAll().then((resp) => {
      console.log(resp);
      // 更新数据
      commit("CREATE", resp || []);
    });
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
