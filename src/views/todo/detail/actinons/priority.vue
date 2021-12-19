<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="130">
    <div
      class="priority-list"
      v-for="item in priority"
      :key="item.label"
      :style="'color:' + item.color"
      @click="changePriority(item.label)"
    >
      <span class="iconfont" v-if="item.label === todoItem.label"
        >&#xe7fc;</span
      >
      <span class="iconfont" v-else>&#xe780;</span>
      {{ item.title }}
    </div>
    <template #reference>
      <div class="detail-button" @click="visible = true">
        <span class="iconfont">&#xe817;</span>
        <span>优先级</span>
      </div>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: "Priority",

  props: ["todoItem"],
  data() {
    return {
      visible: false,
      priority: [
        {
          title: "重要且紧急",
          label: "a",
          color: "#f80e15",
        },
        {
          title: "重要不紧急",
          label: "b",
          color: "#BF9F03",
        },
        {
          title: "紧急不重要",
          label: "c",
          color: "#009fe3",
        },
        {
          title: "不紧急不重要",
          label: "d",
          color: "#79aa1c",
        },
      ],
    };
  },

  methods: {
    // 改变 todo item 的优先级
    changePriority(label) {
      console.log(label);

      // 业务逻辑 TODO(jx)

      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.priority-list {
  margin-top: 8px;
  padding-left: 10px;

  &:hover {
    background-color: #eef1f3;
  }
}
</style>
