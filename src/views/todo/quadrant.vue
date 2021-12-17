<template>
  <div class="quadrant">
    <Title :tag="tag" title="重要且紧急"></Title>
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
  props: ["tag"],
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

.quadrant {
  @include full-all;

  border-radius: 4px;

  background-color: rgba($color: #fff, $alpha: 0.6);

  // 布局
  display: grid;
  grid-template-rows: 34px 5fr;

  .body {
    width: 100%;
    height: 100%;
  }
}
</style>
