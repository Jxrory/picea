<template>
  <div class="detail-comment">
    <span class="iconfont">&#xe615;</span>
    <div style="width: 100%">
      <div class="title">
        <span class="hover" @click="isShowLog = false">评论</span>
        <span style="margin: 0 20px">|</span>
        <span class="hover" @click="isShowLog = true">操作记录</span>
      </div>
      <Comments :__idx="__idx" v-if="!isShowLog" />
      <Logs :__idx="__idx" v-if="isShowLog" />
    </div>
  </div>
</template>

<script>
import Comments from "./list";
import Logs from "./log";

export default {
  name: "DetailComment",

  components: {
    Comments,
    Logs,
  },

  props: ["__idx"],
  data() {
    return {
      isShowLog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/todo/detail.scss";

.detail-comment {
  @extend .detail-body-grid;

  margin-top: 20px;
  min-height: 240px;
  padding-bottom: 60px;
  position: relative;

  .title {
    font-size: 16px;
    color: #42526e;
    font-weight: 600;

    .hover {
      cursor: pointer;
      &:hover {
        color: #0285d7;
      }
    }
  }
}
</style>
