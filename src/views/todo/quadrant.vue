<template>
  <div class="quadrant">
    <Title :tag="quadrantData.tag" :title="quadrantData.title"></Title>
    <div class="body">
      <draggable
        v-model="todoList"
        tag="transition-group"
        group="todoList"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="item" :key="element.id">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
// 拖拽功能组件
import draggable from "vuedraggable";

// 内部组件 Title
import Title from "./title";

export default {
  name: "Quadrant",

  components: {
    Title,
    draggable,
  },

  emits: ["moveData"],
  props: ["quadrantData"],
  data() {
    return {
      // todoList: this.quadrantData.todoList,
    };
  },
  computed: {
    todoList: {
      get() {
        // return this.quadrantData.todoList;
        return this.$store.state.todoList[this.quadrantData.tag].todoList;
      },
      set(value) {
        console.log("---- set ----");
        console.log(this.quadrantData.tag);
        console.log(value);
        // this.$emit(this.quadrantData.tag, value);
        this.$store.commit("todoList/updateTodoList", {
          tag: this.quadrantData.tag,
          list: value,
        });
      },
    },
  },

  methods: {
    log(evt) {
      console.log("------ log start ------");
      console.log(evt);
      console.log("------ log end ------");
    },
    start(evt) {
      console.log("------ start start ------");
      console.log(evt);
      console.log("------ start end ------");
    },
    end(evt) {
      console.log("------ end start ------");
      console.log(evt);
      console.log("------ end end ------");
      // evt.item //可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // evt.oldIndex  // 可以知道拖动前的位置
      // evt.newIndex  // 可以知道拖动后的位置
    },
    add(evt) {
      console.log("------ add start ------");
      console.log(this.quadrantData.tag);
      console.log(evt);
      console.log(this.quadrantData.todoList);
      console.log("------ add end ------");
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";

.quadrant {
  @include full-all;

  // 布局: 单象限内 title & body 上下布局
  display: grid;
  // title 高度 34px, 剩下的是 body 内容
  grid-template-rows: 34px 1fr;

  .body {
    @include full-all;

    border-radius: 0 0 4px 4px; // 设置下边两个角4px的圆弧

    background-color: rgba($color: #fff, $alpha: 0.6);

    .item {
      width: 100%;

      // 测试使用
      margin-top: 3px;
      background-color: salmon;
    }
  }
}
</style>
