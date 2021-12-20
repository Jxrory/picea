<template>
  <div class="detail-button" v-if="todoItem.status === 0" @click="done">
    <span class="iconfont">&#xe603;</span>
    <span>标记为已完成</span>
  </div>
  <div class="detail-button" v-else @click="reopen">
    <span class="iconfont">&#xe604;</span>
    <span>标记为未完成</span>
  </div>
</template>

<script>
export default {
  name: "FinishButton",

  props: ["todoItem"],
  data() {
    return {};
  },

  methods: {
    done() {
      console.log(this.todoItem);
      this.$store.dispatch("todos/done", this.todoItem.__idx);
    },
    reopen() {
      this.$store.dispatch("todos/reopen", this.todoItem.__idx);
    },
  },
};
</script>

<style lang="scss"></style>
