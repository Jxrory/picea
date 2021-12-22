<template>
  <div class="detail-header">
    <span class="iconfont">&#xe615;</span>
    <div style="width: 100%">
      <div class="title"><span>评论</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailComment",

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/todo/detail.scss";

.detail-header {
  @extend .detail-body-grid;

  .title {
    font-size: 16px;
    color: #42526e;
    font-weight: 600;
  }
}
</style>
