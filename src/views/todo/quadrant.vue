<template>
  <div class="quadrant">
    <Title :tag="quadrantData.tag" :title="quadrantData.title"></Title>
    <div class="body">
      <!-- 不要添加 [tag="transition-group"], 存在 bug 卡了半天... -->
      <draggable v-model="todoList" group="todoList" item-key="id">
        <template #item="{ element }">
          <Thing :content="element"></Thing>
        </template>
      </draggable>
      <div v-if="!todoList || todoList.length === 0" class="empty">
        恭喜你！已完成了所有待办
      </div>
    </div>
  </div>
</template>

<script>
// 拖拽功能组件
import draggable from "vuedraggable";

// 内部组件 Title & Thing
import Title from "./title";
import Thing from "./thing";

export default {
  name: "Quadrant",

  components: {
    draggable,
    Title,
    Thing,
  },

  emits: ["moveData"],
  props: ["quadrantData"],
  data() {
    return {};
  },
  computed: {
    todoList: {
      get() {
        return this.quadrantData.todoList;
        // return this.$store.state.todoList[this.quadrantData.tag].todoList;
      },
      set(value) {
        this.$emit("moveData", this.quadrantData.tag, value);
        // this.$store.commit("todoList/updateTodoList", {
        //   tag: this.quadrantData.tag,
        //   list: value,
        // });
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
    },
    add(evt) {
      console.log("------ add start ------");
      console.log(evt);
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

    background-color: #f2f4f5;
  }
}
</style>
