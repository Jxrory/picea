<template>
  <div class="quadrant">
    <Title :tag="tag" :title="title"></Title>
    <div class="body"></div>
  </div>
</template>

<script>
import Title from "./title";

export default {
  name: "Quadrant",
  components: {
    Title,
  },
  props: ["tag", "title", "todoList"],
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

.quadrant {
  @include full-all;

  // 布局: 单象限内 title & body 上下布局
  display: grid;
  // title 高度 34px, 剩下的是 body 内容
  grid-template-rows: 34px 1fr;

  .body {
    @include full-all;

    border-radius: 0 0 4px 4px; // 设置下边两个角4px的圆弧

    background-color: rgba($color: #fff, $alpha: 0.6);
  }
}
</style>
