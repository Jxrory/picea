// imports

// initial state
// shape:
const state = () => ({
  a: {
    tag: "a",
    title: "重要且紧急",
    todoList: [{ id: 10, name: "test1" }],
  },
  b: {
    tag: "b",
    title: "重要不紧急",
    todoList: [{ id: 20, name: "test2" }],
  },
  c: {
    tag: "c",
    title: "紧急不重要",
    todoList: [{ id: 30, name: "test3" }],
  },
  d: {
    tag: "d",
    title: "不重要不紧急",
    todoList: [{ id: 40, name: "test4" }],
  },
});

// getters
const getters = {};

// mutations
const mutations = {
  updateTodoList(state, { tag, list }) {
    console.log("---------- updateTodoList ----------");
    console.log(tag);
    console.log(list);
    console.log(state[tag].todoList);
    state[tag].todoList = list;
  },
};

// actions
const actions = {
  // updateTodoList(state, { tag, list }) {
  //   console.log("---------- updateTodoList ----------");
  //   console.log(tag);
  //   console.log(list);
  //   state.todoList[tag].todoList = list;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
