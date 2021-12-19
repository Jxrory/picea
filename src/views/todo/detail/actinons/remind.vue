<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="100">
    <div
      class="remind-list"
      v-for="item in remind"
      :key="item.value"
      @click="changeRemind(item.value)"
    >
      <span class="iconfont" v-if="item.value === todoItem.remind"
        >&#xe7fc;</span
      >
      <span class="iconfont" v-else>&#xe780;</span>
      {{ item.title }}
    </div>

    <template #reference>
      <div class="detail-button">
        <span class="iconfont">&#xe716;</span>
        <span>提醒设置</span>
      </div>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: "Remind",

  props: ["todoItem"],
  data() {
    return {
      visible: false,

      remind: [
        {
          title: "开始时5分钟",
          value: 0,
        },
        {
          title: "开始时前15分钟",
          value: 1,
        },
        {
          title: "开始时前30分钟",
          value: 2,
        },
        {
          title: "开始时前1天",
          value: 3,
        },
      ],
    };
  },

  methods: {
    changeRemind(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.remind-list {
  margin-top: 8px;
  padding-left: 10px;

  &:hover {
    background-color: #eef1f3;
  }
}
</style>
