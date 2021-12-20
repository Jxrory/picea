<template>
  <div class="todo-main-box">
    <Quadrant
      v-for="quadrandConfig in quadrandsConfig"
      :key="quadrandConfig.label"
      :quadrandConfig="quadrandConfig"
    ></Quadrant>
  </div>
</template>

<script>
import Quadrant from "./quadrant.vue";

export default {
  name: "TODO",

  components: {
    Quadrant,
  },

  data() {
    return {
      quadrandsConfig: [],
    };
  },

  created() {
    this.quadrandsConfig = this.$store.getters["todos/getQuadrantsConfig"];
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
// 引入 iconfont 字体
@import "~@/styles/iconfont.css";

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
