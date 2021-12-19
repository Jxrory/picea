<template>
  <div class="todo-detail">TODO Detail Page</div>
</template>

<script>
export default {
  // TODO 页面的详情页面
  name: "Detail",

  props: ["todoItem"],

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.todo-detail {
  width: 100%;
  height: 100%;
  background-color: salmon;
}
</style>
