<template>
  <div class="thing" :key="todoItem.no">
    <span class="iconfont iconfont-color" v-if="!isDone" @click="done"
      >&#xe601;</span
    >
    <span class="iconfont iconfont-color" v-else @click="reopen">&#xe669;</span>
    <span class="title">{{ todoItem.title }}</span>
  </div>
</template>

<script>
export default {
  name: "Thing",

  props: ["todoItem"],

  data() {
    return {
      isDone: false,
    };
  },

  methods: {
    done() {
      this.isDone = true;

      // 请求 done todoItem
    },
    reopen() {
      this.isDone = false;

      // 请求 reopen todoItem
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";
@import "~@/styles/iconfont.css";

.thing {
  width: 100%;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;

  display: grid;
  align-items: center;
  grid-template-columns: 25px 1fr;

  background-color: #fff;
  border: dotted 1px rgba(153, 153, 153, 0.25);

  .iconfont-color {
    color: #666;
  }

  .title {
    justify-self: start;

    font-size: 0.8rem;
  }

  &:hover {
    background-color: #f2f4f5;
  }
}
</style>
