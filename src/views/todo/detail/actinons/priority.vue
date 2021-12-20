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
      {{ item.labelDetail }}
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
      priority: [],
    };
  },

  created() {
    this.priority = this.$store.getters["todos/getQuadrantsConfig"];
  },
  methods: {
    // 改变 todo item 的优先级
    changePriority(label) {
      this.$store.dispatch("todos/updateLabel", {
        __idx: this.todoItem.__idx,
        label: label,
      });

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
