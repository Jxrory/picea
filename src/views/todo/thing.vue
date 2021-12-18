<template>
  <div class="thing" :key="content.id">
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

.thing {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;

  background-color: #fff;
  border: dotted 1px rgba(153, 153, 153, 0.25);
}
</style>
