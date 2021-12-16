<template>
  <div :class="'title-' + tag">{{ title }}</div>
</template>

<script>
export default {
  name: "Title",
  props: ["title", "tag"],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.quadrant-title-common {
  height: 34px;
  widows: 100%;

  border-radius: 4px 4px 0 0;
}

.quadrant {
  .title-a {
    @extend .quadrant-title-common;

    background-color: rgba($color: #f67b7c, $alpha: 0.6);
  }

  .title-b {
    @extend .quadrant-title-common;

    background-color: rgba($color: #ebd782, $alpha: 0.6);
  }

  .title-c {
    @extend .quadrant-title-common;

    background-color: rgba($color: #55abe4, $alpha: 0.6);
  }

  .title-d {
    @extend .quadrant-title-common;

    background-color: rgba($color: #8db756, $alpha: 0.6);
  }
}
</style>
