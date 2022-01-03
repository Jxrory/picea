<template>
  <div class="detail-header">
    <span class="iconfont">&#xe6fd;</span>
    <div style="width: 100%">
      <div class="title"><span>描述</span></div>
      <textarea
        placeholder="添加详细描述..."
        @change="change"
        v-model="input"
        :rows="rows"
      ></textarea>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "DetailDescribe",

  props: ["__idx", "content"],
  data() {
    return {
      input: "",
      rows: 0, // 数据行数
    };
  },

  created() {
    this.input = this.content || "";
    this.rows = [...this.input].filter((c) => c === "\n").length + 2;
  },
  methods: {
    change() {
      store.dispatch("todos/updateItem", {
        __idx: this.__idx,
        data: { description: this.input },
      });
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/todo/detail.scss";
@import "~@/styles/_var.scss";

.detail-header {
  @extend .detail-body-grid;

  .title {
    font-size: 16px;
    color: #42526e;
    font-weight: 600;
  }

  textarea {
    border: 2px solid #f4f5f7;
    cursor: pointer;
    color: #172b4d;
    background: rgba(9, 30, 66, 0.04);
    width: 90%;
    border-radius: 3px;
    resize: none;
    margin-top: 10px;
    min-height: 77px;
    max-height: 180px;

    &:focus {
      outline: 0;
      background: #fff;
      // height: 100px;
      border-color: $primary;
    }
  }
}
</style>
