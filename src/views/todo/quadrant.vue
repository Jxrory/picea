<template>
  <div class="quadrant">
    <Title
      :label="quadrandConfig.label"
      :labelDetail="quadrandConfig.labelDetail"
    ></Title>
    <div class="body">
      <!-- 不要添加 [tag="transition-group"], 存在 bug 卡了半天... -->
      <draggable v-model="todoList" group="todoList" item-key="uid">
        <!-- [keng] 只能用 element ... -->
        <template #item="{ element }">
          <Thing :todoItem="element"></Thing>
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

  props: ["quadrandConfig"],
  data() {
    return {};
  },
  computed: {
    todoList: {
      get() {
        return this.$store.getters["todos/getListByLabel"](
          this.quadrandConfig.label
        );
      },
      set(newTodoList) {
        for (let i = 0; i < newTodoList.length; i++) {
          // 换象限: 修改 todo item label
          if (newTodoList[i].label !== this.quadrandConfig.label) {
            this.$store.dispatch("todos/updateLabel", {
              __idx: newTodoList[i].__idx,
              label: this.quadrandConfig.label,
            });
          }
          // 组内换顺序: 修改 order TODO(jx)
        }
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

    .empty {
      margin-top: 30px;
      font-size: 0.8rem;
    }
  }
}
</style>
