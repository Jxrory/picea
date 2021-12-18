<template>
  <div :class="tag">
    <el-icon color="#fff"><list /></el-icon>
    <span class="title-name">{{ title }}</span>
    <div>
      <el-input
        v-if="isEditStatus"
        v-model="input"
        type="text"
        maxlength="200"
        width="100%"
        placeholder="请在这里输入需要处理的事项"
        size="small"
        @keyup.enter="saveHandler"
      />
    </div>
    <el-icon
      class="edit-btn"
      color="#fff"
      @click="
        isEditStatus = !isEditStatus;
        input = ''; // 清除数据
      "
    >
      <edit v-if="!isEditStatus" />
      <close v-else />
    </el-icon>
  </div>
</template>

<script>
import { Edit, List, Close } from "@element-plus/icons-vue";

export default {
  name: "Title",

  components: {
    Edit,
    List,
    Close,
  },

  props: ["title", "tag"],
  data() {
    return {
      // 状态
      isEditStatus: false,
      // 便捷输入框输入的数据
      input: "",
    };
  },

  methods: {
    // 数据初始化
    dataInit() {
      this.isEditStatus = false;
      this.input = "";
    },
    // 保存便捷输入的数据
    saveHandler() {
      console.log("保存内容: " + this.input);

      // 保存数据到后端 TODO(jx)

      this.dataInit();

      // 刷新 TODO 页面数据 TODO(jx)
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/mixin.scss";

.quadrant-title-common {
  @include full-all;

  // 设置上面边两个角4px的圆弧
  border-radius: 4px 4px 0 0;

  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;

  // 布局: 标题栏 4 个部件直接的布局方式
  display: grid;
  grid-template-columns: 16px 1fr 5fr 25px;
  align-items: center;
}

.quadrant {
  .a {
    @extend .quadrant-title-common;

    background-color: rgba(248, 14, 21, 0.6);
  }

  .b {
    @extend .quadrant-title-common;

    background-color: rgba(236, 196, 2, 0.6);
  }

  .c {
    @extend .quadrant-title-common;

    background-color: rgba(0, 159, 227, 0.7);
  }

  .d {
    @extend .quadrant-title-common;

    background-color: rgba(121, 170, 28, 0.7);
  }

  .title-name {
    justify-self: start;
    margin-left: 5px;

    font-size: 0.9em;
    color: #fff;
  }

  .edit-btn {
    justify-self: end;
  }
}
</style>
