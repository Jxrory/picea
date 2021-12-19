<template>
  <div class="todo-detail">
    <div class="body"></div>
    <Actions :todoItem="todoItem" />
  </div>
</template>

<script>
import Actions from "./detail/actinons";

export default {
  // TODO 页面的详情页面
  name: "Detail",

  components: {
    Actions,
  },

  props: ["todoItem"],

  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

.todo-detail {
  @include full-all;

  // 布局
  display: grid;
  grid-template-columns: 1fr 150px;
}
</style>
