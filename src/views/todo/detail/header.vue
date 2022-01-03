<template>
  <div class="detail-header">
    <span class="iconfont" style="margin-top: 10px">&#xe60a;</span>
    <div class="detail-header-title" style="width: 100%">
      <input type="text" v-model="input" @change="change" />
      <div class="time">创建于：{{ date }}</div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";
import store from "@/store";

export default {
  name: "DetailHeader",

  props: ["__idx", "title", "start"],
  data() {
    return {
      input: "",
      date: "",
    };
  },

  created() {
    this.input = this.title;
    this.date = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(this.start));
  },
  methods: {
    change() {
      console.log(this.input);
      store.dispatch("todos/update", {
        __idx: this.__idx,
        key: "summary",
        value: this.input,
      });
    },
  },
};
</script>

<style lang="scss" scope>
@import "~@/styles/todo/detail.scss";

.detail-header {
  @extend .detail-body-grid;

  width: 100%;
  margin-bottom: 20px;

  font-size: 20px;
  color: #42526e;
  font-weight: 600;

  .time {
    text-align: start;
    font-size: 12px;
    font-weight: 400;
    color: #606266;
  }

  input {
    font-size: 20px;
    font-weight: 600;
    border: 2px solid #fff;
    padding: 5px 2px;
    cursor: pointer;
    color: #172b4d;
    background: #fff;
    width: 100%;
    border-radius: 3px;
    box-sizing: border-box;

    &:disabled {
      color: #999;
      text-decoration: line-through;
    }

    &:focus {
      outline: 0;
      background: #fff;
      border-color: #0396f2;
    }
  }
}
</style>
