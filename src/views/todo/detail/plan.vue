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
export default {
  name: "DetailPlan",

  props: ["start", "end"],
  computed: {
    startDate() {
      console.log("start:", this.start, "  end:", this.end);
      return new Date(this.start).toLocaleString();
    },
    endDate() {
      return new Date(this.end).toLocaleString();
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
