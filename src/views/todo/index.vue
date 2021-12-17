<template>
  <div class="todo-main-box">
    <Quadrant
      v-for="quadrant in quadrants"
      :key="quadrant.tag"
      :tag="quadrant.tag"
      :title="quadrant.title"
      :todoList="quadrant.todoList"
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
          todoList: [],
        },
        {
          tag: "b",
          title: "重要不紧急",
          todoList: [],
        },
        {
          tag: "c",
          title: "紧急不重要",
          todoList: [],
        },
        {
          tag: "d",
          title: "不重要不紧急",
          todoList: [],
        },
      ],
    };
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
