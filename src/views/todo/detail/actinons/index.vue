<!-- 目前定位为个人使用一些功能先砍掉: OwnerButton, AttachButton, WatcherButton -->

<template>
  <div class="detail-actions">
    <FinishButton :todoItem="todoItem" />
    <PriorityButton :todoItem="todoItem" />
    <!-- <OwnerButton :todoItem="todoItem" /> -->
    <PlanButton :todoItem="todoItem" />
    <!-- <RemindButton :todoItem="todoItem" /> -->
    <!-- <AttachButton :todoItem="todoItem" /> -->
    <!-- <WatcherButton :todoItem="todoItem" /> -->
    <!-- 归档?? 啥子意思呢? 先不要了 -->
    <!-- <ArchiveButton :todoItem="todoItem" /> -->
    <RemoveButton :todoItem="todoItem" />
  </div>
</template>

<script>
import FinishButton from "./finish";
import PriorityButton from "./priority";
// import OwnerButton from "./owner";
import PlanButton from "./plan";
import RemindButton from "./remind";
// import AttachButton from "./attach";
// import WatcherButton from "./watcher";
// import ArchiveButton from "./archive";
import RemoveButton from "./remove";

export default {
  name: "Actions",

  components: {
    FinishButton,
    PriorityButton,
    // OwnerButton,
    PlanButton,
    RemindButton,
    // AttachButton,
    // WatcherButton,
    // ArchiveButton,
    RemoveButton,
  },

  props: ["todoItem"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/todo/detail.scss";

.detail-actions {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
