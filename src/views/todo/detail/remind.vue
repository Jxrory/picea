<template>
  <div class="detail-header">
    <span class="iconfont">&#xe716;</span>
    <span class="content">提醒设置：{{ remindStr }} </span>
  </div>
</template>

<script>
export default {
  name: "DetailRemind",

  props: ["remind"],
  computed: {
    remindStr() {
      if (this.remind == undefined || this.remind <= 0) {
        return "未设置";
      }
      // TODO(jx) 小时, 天
      return "开始时前 " + this.remind + " 分钟";
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
