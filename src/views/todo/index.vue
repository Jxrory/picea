<template>
  <div class="todo-main-box">
    <Quadrant
      v-for="qTodosItem in qTodos"
      :key="qTodosItem.label"
      :qTodosItem="qTodosItem"
      @moveTodoItem="moveTodoItem"
    ></Quadrant>
  </div>
</template>

<script>
import Quadrant from "./quadrant.vue";

export default {
  name: "TODO",

  components: {
    Quadrant,
  },

  data() {
    return {
      qTodos: [
        {
          label: "a",
          labelDetail: "重要且紧急",
          todoList: [
            {
              id: 1,
              label: "a",
              start: 1639567447,
              end: 0,
              no: "61b893effda33d1560585a1e",
              tag: "",
              title: "梳理还款逻辑",
              projectId: "",
              status: 0,
              order: 100000,
            },
          ],
        },
        {
          label: "b",
          labelDetail: "重要不紧急",
          todoList: [
            {
              id: 2,
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
              id: 3,
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
          ],
        },
        {
          label: "c",
          labelDetail: "紧急不重要",
          todoList: [],
        },
        {
          label: "d",
          labelDetail: "不重要不紧急",
          todoList: [
            {
              id: 4,
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
        },
      ],
    };
  },

  methods: {
    moveTodoItem(label, todoList) {
      const idx = { a: 0, b: 1, c: 2, d: 3 }[label];
      console.log("-------- move Data -----------");
      console.log(label);
      console.log(idx);
      console.log(todoList);
      console.log("-------- move Data end -----------");
      this.qTodos[idx].todoList = todoList;
      console.log(this.qTodos[idx].todoList);
    },
  },
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

.todo-main-box {
  @include full-all;

  // 设置 padding 后, 会导致 box 溢出
  box-sizing: border-box;
  padding: 15px;

  // 布局: 4个象限的布局
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px 20px; // 配置后超出范围
  place-items: center center;

  background-image: url("~@/assets/bg/3.jpg");
}
</style>
