<template>
  <div class="quadrant">
    <Title :tag="tag" title="test"></Title>
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
}
</style>
