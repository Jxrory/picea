<template>
  <div class="todo-main-box">
    <Quadrant
      v-for="quadrant in quadrants"
      :key="quadrant.tag"
      :tag="quadrant.tag"
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
          sons: [],
        },
        {
          tag: "b",
          title: "重要不紧急",
          sons: [],
        },
        {
          tag: "c",
          title: "紧急不重要",
          sons: [],
        },
        {
          tag: "d",
          title: "不重要不紧急",
          sons: [],
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

  padding: 15px; // 待商榷
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px 20px; // 配置后超出范围
  place-items: center center;
}
</style>
