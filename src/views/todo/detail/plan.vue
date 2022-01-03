<template>
  <div class="detail-header">
    <span class="iconfont">&#xe621;</span>
    <span class="content"
      >计划时间：{{ startDate }}
      <!-- 完成时间可能不存在 -->
      <span v-if="end && end !== ''"> ~ {{ endDate }}</span>
    </span>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";

export default {
  name: "DetailPlan",

  props: ["start", "end"],
  computed: {
    startDate() {
      console.log("start:", this.start, "  end:", this.end);
      return dateFormat("YYYY-mm-dd HH:MM:SS", new Date(this.start));
    },
    endDate() {
      return dateFormat("YYYY-mm-dd HH:MM:SS", new Date(this.end));
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
