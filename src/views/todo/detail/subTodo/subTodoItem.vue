<template>
  <div
    class="detail-subtodo-item"
    :class="{ finished: !!(subTodoItem.status === 1) }"
  >
    <span class="iconfont status" @click="changeStatus"></span>
    <span class="content">{{ subTodoItem.title }}</span>
    <el-popconfirm
      title="确认删除吗?"
      confirmButtonText="确定"
      cancelButtonText="取消"
      @confirm="remove"
    >
      <template #reference>
        <span class="iconfont close">&#xe747;</span>
      </template>
    </el-popconfirm>
    <Editor v-if="visible" />
  </div>
</template>

<script>
import store from "@/store";
import Editor from "./editor";

export default {
  name: "SubTodoItem",

  components: {
    Editor,
  },

  props: ["__idx", "subTodoItem"],
  data() {
    return {
      // 展示是否显示编辑框
      visible: false,
    };
  },

  methods: {
    // 改变子任务状态
    changeStatus() {
      console.log("改变子任务状态");
      if (this.subTodoItem.status === 0) {
        store.dispatch("todos/doneSubTodoItem", {
          __idx: this.__idx,
          subTodoItem: this.subTodoItem,
        });
      } else {
        store.dispatch("todos/reopenSubTodoItem", {
          __idx: this.__idx,
          subTodoItem: this.subTodoItem,
        });
      }
    },

    // 删除子任务
    remove() {
      console.log("删除子任务");
      store.dispatch("todos/deleteSubTodoItem", {
        __idx: this.__idx,
        subTodoItem: this.subTodoItem,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/_var.scss";

.detail-subtodo-item {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #fafafa;

  &.finished {
    .content {
      text-decoration: line-through;
      color: #999;
    }

    .status:before {
      content: "\e603";
      color: $primary;
    }
  }

  .status {
    height: 32px;
    font-size: 16px;
    line-height: 32px;

    &:hover {
      color: $primary;
    }
  }

  .content {
    margin: 0 10px;
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    overflow: hidden;
  }

  .status::before {
    content: "\e604";
  }

  &:hover {
    background-color: #f4f4f4;

    .close {
      display: inline;
    }
  }

  .close {
    float: right;
    display: none;
    color: #666;

    height: 32px;
    font-size: 16px;
    line-height: 32px;
  }
}
</style>
