<template>
  <div class="detail-subtodo">
    <span class="iconfont">&#xe669;</span>
    <div style="width: 100%">
      <div class="title">
        <span>子任务列表</span>
        <el-button
          class="detail-subtodo-btn"
          type="primary"
          size="mini"
          @click="add"
          >添加子任务</el-button
        >
      </div>

      <el-progress
        v-if="subTodos && subTodos.length > 0"
        :percentage="percentage"
        style="margin: 20px 0 10px 0"
      />
      <div v-else class="subtodo-empty">暂无子任务</div>

      <!-- Sub todo list -->
      <SubTodoItem
        v-for="subTodoItem in subTodos"
        :key="subTodoItem.id"
        :__idx="__idx"
        :subTodoItem="subTodoItem"
      />
      <Editor
        v-if="visible"
        :__idx="__idx"
        :subTodoItem="{ title: '' }"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Editor from "./editor";
import SubTodoItem from "./subTodoItem";

export default {
  name: "DetailSubTodo",
  components: {
    Editor,
    SubTodoItem,
  },

  props: ["__idx"],
  data() {
    return {
      // 展示是否显示编辑框
      visible: false,
    };
  },
  computed: {
    subTodos: {
      get() {
        return store.getters["todos/getSubTodosByIdx"](this.__idx);
      },
    },
    percentage: {
      get() {
        const subTodos = this.subTodos;
        let completCount = 0;
        subTodos.forEach((item) => {
          completCount += item.status === 1 ? 1 : 0;
        });
        return Math.round((completCount / subTodos.length) * 100);
      },
    },
  },

  created() {
    console.log("=======subTodo index======");
    console.log(this.subTodos);
    store.dispatch("todos/getSubTodos", this.__idx);
  },
  methods: {
    add() {
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/todo/detail.scss";

.detail-subtodo {
  @extend .detail-body-grid;

  padding-top: 20px;

  .title {
    font-size: 16px;
    color: #42526e;
    font-weight: 600;

    margin-bottom: 15px;
  }

  .detail-subtodo-btn {
    float: right;
    margin-right: 15px;
  }
}
</style>
