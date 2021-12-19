<template>
  <div class="detail-button" @click="remove">
    <span class="iconfont">&#xe718;</span>
    <span>删除</span>
  </div>
</template>

<script>
export default {
  name: "Remove",

  props: ["todoItem"],
  data() {
    return {};
  },

  methods: {
    // 删除 todo item
    remove() {
      console.log(this.todoItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-button {
  color: rgba(248, 14, 21, 0.6);

  &:hover {
    color: #fff;
    background-color: rgba(248, 14, 21, 0.5);
  }
}
</style>
