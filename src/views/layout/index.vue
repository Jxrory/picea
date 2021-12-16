<template>
  <router-view />
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";

html,
body,
#app {
  @include full-all;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
