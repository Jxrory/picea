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
    // 完成 todoItem TODO(jx)
    done() {
      console.log(this.todoItem);
    },
    // 重开 todoItem TODO(jx)
    reopen() {},
  },
};
</script>

<style lang="scss"></style>
