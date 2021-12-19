<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="400">
    <el-date-picker
      v-model="dateRange"
      type="datetimerange"
      :shortcuts="shortcuts"
      range-separator="到"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    >
    </el-date-picker>
    <template #reference>
      <div class="detail-button" @click="visible = true">
        <!-- 想实现点击按钮后直接弹出日历选择器 TODO(jx) -->
        <span class="iconfont">&#xe621;</span>
        <span>时间设置</span>
      </div>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: "Plan",

  props: ["todoItem"],
  data() {
    return {
      visible: false,
      dateRange: "",
      shortcuts: [
        {
          text: "半小时",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 500);
            return [start, end];
          },
        },
        {
          text: "一小时",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 1);
            return [start, end];
          },
        },
        {
          text: "一天",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            return [start, end];
          },
        },
        {
          text: "一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
