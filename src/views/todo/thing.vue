<template>
  <div class="thing">
    <span class="iconfont iconfont-color" v-if="isNeedDone" @click="done"
      >&#xe601;</span
    >
    <span class="iconfont iconfont-color" v-if="isDone" @click="reopen"
      >&#xe669;</span
    >
    <span :class="isDone ? 'title-done' : 'title-undo'" @click="showDetail">{{
      todoItem.summary
    }}</span>

    <el-dialog v-model="isShowDetail" title="" width="55%" top="5vh">
      <Detail :todoItem="todoItem"></Detail>
    </el-dialog>
  </div>
</template>

<script>
import Detail from "./detail.vue";

import { todoItemIsDone, todoItemCanDone } from "@/common/status";

export default {
  name: "Thing",

  components: {
    Detail,
  },

  props: ["todoItem"],

  data() {
    return {
      // 显示详细信息
      isShowDetail: false,
    };
  },
  computed: {
    // 是否已经完成
    isDone: {
      get() {
        return todoItemIsDone(this.todoItem.status);
      },
    },

    // 状态是否可以转换到完成状态
    isNeedDone: {
      get() {
        return todoItemCanDone(this.todoItem.status);
      },
    },
  },

  methods: {
    // 完成 todoItem
    done() {
      this.$store.dispatch("todos/done", this.todoItem.__idx);
    },

    // 重新开启 todoItem
    reopen() {
      this.$store.dispatch("todos/reopen", this.todoItem.__idx);
    },

    // 点击 todoItem Title 后, 展示详细信息
    showDetail() {
      this.isShowDetail = true;
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";
@import "~@/styles/iconfont.css";

.thing {
  width: 100%;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;

  display: grid;
  align-items: center;
  grid-template-columns: 25px 1fr;

  background-color: #fff;
  border: dotted 1px rgba(153, 153, 153, 0.25);

  .iconfont-color {
    color: #666;
  }

  .title-undo {
    width: 100%;
    text-align: start;

    justify-self: start;

    font-size: 0.8rem;
  }

  .title-done {
    @extend .title-undo;

    color: #999;
    text-decoration: line-through;
  }

  &:hover {
    background-color: #f2f4f5;
  }
}
</style>
