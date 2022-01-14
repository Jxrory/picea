<template>
  <router-view />

  <el-dialog v-model="showSeachCenter" :show-close="false" width="50%">
    show search center
  </el-dialog>
</template>

<script>
import store from "@/store";
export default {
  name: "Layout",

  computed: {
    showSeachCenter: {
      get() {
        const res = store.getters["config/getshowSeachCenter"];
        console.log("showSeachCenter get res=", res);
        return res;
      },
      set(val) {
        console.log("showSeachCenter set val=", val);
        store.commit("config/CHANGE_CHOOSE_SPACE", val);
      },
    },
  },

  created: () => {
    document.onkeydown = function (e) {
      // 按下 command + k 或者 ctrl + k
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        const val = store.getters["config/getshowSeachCenter"];
        store.commit("config/CHANGE_CHOOSE_SPACE", !val);
      }
    };
  },
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
