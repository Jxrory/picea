<template>
  <div class="todo-detail">
    <div class="detail-body">
      <Header
        :__idx="todoItem.__idx"
        :title="todoItem.title"
        :start="todoItem.start"
      />
      <Describe :__idx="todoItem.__idx" :content="todoItem.content" />
      <Plan :start="todoItem.start" :end="todoItem.end" />
      <Priority :label="todoItem.label" />
      <Remind :remind="todoItem.remind" />
      <SubTodo :__idx="todoItem.__idx" :subTodos="todoItem.subTodos" />
      <Comment :__idx="todoItem.__idx" :comments="todoItem" />
    </div>
    <Actions :todoItem="todoItem" />
  </div>
</template>

<script>
import Header from "./detail/header";
import Describe from "./detail/describe";
import Plan from "./detail/plan";
import Priority from "./detail/priority";
import Remind from "./detail/remind";
import SubTodo from "./detail/subTodo";
import Comment from "./detail/comment";

import Actions from "./detail/actinons";

export default {
  // TODO 页面的详情页面
  name: "Detail",

  components: {
    Header,
    Describe,
    Plan,
    Priority,
    Remind,
    SubTodo,
    Comment,

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
