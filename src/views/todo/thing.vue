<template>
  <div class="thing" :key="content.id">
    <div>
      <span class="iconfont iconfont-color">&#xe7d1;</span>
    </div>
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  name: "Thing",

  props: ["content"],

  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";
@import "~@/styles/iconfont.css";

.thing {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  display: grid;
  align-items: center;
  grid-template-columns: 25px 1fr;

  background-color: #fff;
  border: dotted 1px rgba(153, 153, 153, 0.25);

  .iconfont-color {
    color: #666;
  }

  &:hover {
    background-color: #f2f4f5;
  }
}
</style>
