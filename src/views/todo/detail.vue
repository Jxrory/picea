<template>
  <div class="todo-detail">
    <div class="detail-body">
      <Header
        :__idx="todoItem.__idx"
        :title="todoItem.title"
        :start="todoItem.start"
      />
      <Describe :todoItem="todoItem" />
    </div>
    <Actions :todoItem="todoItem" />
  </div>
</template>

<script>
import Header from "./detail/header";
import Describe from "./detail/describe";
import Actions from "./detail/actinons";

export default {
  // TODO 页面的详情页面
  name: "Detail",

  components: {
    Header,
    Describe,
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
