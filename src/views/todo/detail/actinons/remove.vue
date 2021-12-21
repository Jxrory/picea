<template>
  <el-popconfirm
    title="确定要删除该任务吗?"
    confirmButtonText="确定"
    cancelButtonText="取消"
    @confirm="remove"
  >
    <template #reference>
      <div class="detail-button">
        <span class="iconfont">&#xe718;</span>
        <span>删除</span>
      </div>
    </template>
  </el-popconfirm>
</template>

<script>
import store from "@/store";
export default {
  name: "Remove",

  props: ["todoItem"],
  data() {
    return {};
  },

  methods: {
    // 删除 todo item
    remove() {
      console.log(this.todoItem);
      store.dispatch("todos/delete", this.todoItem.__idx);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-button {
  color: rgba(248, 14, 21, 0.6);

  &:hover {
    color: #fff;
    background-color: rgba(248, 14, 21, 0.5);
  }
}
</style>
