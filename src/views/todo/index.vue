<template>
  <div class="todo-main">
    <Header />
    <div class="todo-main-box">
      <Quadrant
        v-for="quadrandConfig in quadrandsConfig"
        :key="quadrandConfig.label"
        :quadrandConfig="quadrandConfig"
      ></Quadrant>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Quadrant from "./quadrant.vue";
import Header from "./header.vue";

export default {
  name: "TODO",

  components: {
    Quadrant,
    Header,
  },

  data() {
    return {
      quadrandsConfig: [],
    };
  },

  created() {
    this.quadrandsConfig = store.getters["todos/getQuadrantsConfig"];
    store.dispatch("todos/getTodos");
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
// 引入 iconfont 字体
@import "~@/styles/iconfont.css";

.todo-main {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 35px 1fr;
}

.todo-main-box {
  @include full-all;

  // 设置 padding 后, 会导致 box 溢出
  box-sizing: border-box;
  padding: 15px;

  // 布局: 4个象限的布局
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px 20px; // 配置后超出范围
  place-items: center center;

  background-image: url("~@/assets/bg/3.jpg");
}
</style>
