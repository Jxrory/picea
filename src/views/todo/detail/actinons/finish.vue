<template>
  <div class="detail-button" v-if="isCanDone" @click="done">
    <span class="iconfont">&#xe603;</span>
    <span>标记为已完成</span>
  </div>
  <div class="detail-button" v-if="isDone" @click="reopen">
    <span class="iconfont">&#xe604;</span>
    <span>标记为未完成</span>
  </div>
</template>

<script>
import { todoItemIsDone, todoItemCanDone } from "@/common/status";

export default {
  name: "FinishButton",

  props: ["todoItem"],
  data() {
    return {};
  },
  computed: {
    // 是否已经完成
    isDone: {
      get() {
        return todoItemIsDone(this.todoItem.status);
      },
    },

    // 状态是否可以转换到完成状态
    isCanDone: {
      get() {
        return todoItemCanDone(this.todoItem.status);
      },
    },
  },

  methods: {
    done() {
      this.$store.dispatch("todos/done", this.todoItem.__idx);
    },
    reopen() {
      this.$store.dispatch("todos/reopen", this.todoItem.__idx);
    },
  },
};
</script>

<style lang="scss"></style>
