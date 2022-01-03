<template>
  <div class="detail-header">
    <span class="iconfont">&#xe817;</span>
    <span class="content"
      >优先级：<span :style="'color:' + quadrantConfig.color">{{
        quadrantConfig.labelDetail
      }}</span>
    </span>
  </div>
</template>

<script>
import store from "@/store";
import { priority2label } from "@/common/status";

export default {
  name: "DetailPriority",

  props: ["priority"],
  computed: {
    quadrantConfig() {
      return store.getters["todos/getQuadrantConfigByLable"](
        priority2label(this.priority)
      );
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/todo/detail.scss";
@import "~@/styles/_var.scss";

.detail-header {
  @extend .detail-body-grid;

  font-size: 0.9rem;
  font-weight: 400;
  color: #606266;
}
</style>
