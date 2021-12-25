<template>
  <div class="subtodo-editor">
    <input
      class="sub-todo-editor"
      v-model="input"
      placeholder="按回车键, 添加子任务"
      @keydown.esc.stop="cancel"
      @keyup.enter="submit"
    />
    <el-button size="mini" type="success" @click="submit">确定</el-button>
    <el-button size="mini" type="info" @click="cancel">取消</el-button>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "DetailSubTodoEditor",

  emits: ["cancel"],
  props: ["__idx", "subTodoItem"],
  data() {
    return {
      input: "",
    };
  },

  created() {
    console.log("__idx: ", this.__idx, "\tsubTodoItem: ", this.subTodoItem);
    this.input = this.subTodoItem.title || "";
  },
  methods: {
    cancel() {
      // 调用父方法隐藏输入框, 清除 input 信息
      console.log("cancel");
      this.$emit("cancel");
      this.input = "";
    },
    submit() {
      console.log("submit:" + this.input);
      if (this.input === "") {
        return;
      }

      const subTodoItem = JSON.parse(JSON.stringify(this.subTodoItem));
      subTodoItem.title = this.input;

      // 保存子任务数据, 存在两种状态: 1. 新增; 2. 保存;
      if (subTodoItem && !subTodoItem.id) {
        subTodoItem.status = 0; // 0 未完成, 1 完成, 2 删除
        subTodoItem.id = Date.now();
        console.log(subTodoItem);
        store.dispatch("todos/createSubTodos", {
          __idx: this.__idx,
          subTodoItem: subTodoItem,
        });
      } else if (subTodoItem && subTodoItem.id && subTodoItem.id > 0) {
        store.dispatch("todos/updateSubTodoItem", {
          __idx: this.__idx,
          subTodoItem: subTodoItem,
        });
        this.cancel();
      }

      // 清除原先的内容
      this.input = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/_var.scss";
.subtodo-editor {
  .sub-todo-editor {
    height: 48px;
    width: 96%;
    outline: 0;
    padding: 0 2%;
    border: solid 2px #ddd;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;

    font-size: 0.9rem;

    &:focus {
      border-color: $todo_blue;
    }
  }
}
</style>
