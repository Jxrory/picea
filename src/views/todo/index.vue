<template>
  <div class="todo-main-box">
    <Quadrant
      v-for="quadrant in quadrants"
      :key="quadrant.tag"
      :quadrantData="quadrant"
      @moveData="moveData"
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
      quadrants: [
        {
          tag: "a",
          title: "重要且紧急",
          todoList: [
            { id: 1, name: "test1" },
            { id: 11, name: "test1-1" },
            { id: 12, name: "test1-2" },
          ],
        },
        {
          tag: "b",
          title: "重要不紧急",
          todoList: [{ id: 2, name: "test2" }],
        },
        {
          tag: "c",
          title: "紧急不重要",
          todoList: [
            { id: 3, name: "test3" },
            { id: 31, name: "test3-1" },
            { id: 32, name: "test3-2" },
          ],
        },
        {
          tag: "d",
          title: "不重要不紧急",
          todoList: [{ id: 4, name: "test4" }],
        },
      ],
    };
  },

  methods: {
    moveData(tag, items) {
      const idx = { a: 0, b: 1, c: 2, d: 3 }[tag];
      console.log("-------- move Data -----------");
      console.log(tag);
      console.log(idx);
      console.log(items);
      console.log("-------- move Data end -----------");
      this.quadrants[idx].todoList = items;
      console.log(this.quadrants[idx].todoList);
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
