<template>
  <div
    class="detail-subtodo-item"
    :class="{ finished: !!(subTodoItem.status === 1) }"
  >
    <span class="iconfont status" @click="changeStatus"></span>
    <span class="content" @click="visible = true">{{ subTodoItem.title }}</span>
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

    <!-- 修改子任务的内容 -->
    <Editor
      v-if="visible"
      :__idx="__idx"
      :subTodoItem="subTodoItem"
      @cancel="cancelEdit"
    />
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

    // 取消编辑
    cancelEdit() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/_var.scss";

.detail-subtodo-item {
  cursor: pointer;
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  height: 32px;
  background-color: #fafafa;
  // box-sizing: border-box;

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
    position: absolute;
    left: 5px;
    top: 8px;

    &:hover {
      color: $primary;
    }
  }

  .content {
    display: block;
    min-width: 100%;
    margin: 0 28px;
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
      display: inline-block;
    }
  }

  .close {
    display: none;
    color: #666;

    position: absolute;
    top: 8px;
    right: 5px;
  }

  .subtodo-editor {
    position: absolute;
    z-index: 9999;
  }
}
</style>
