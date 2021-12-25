<template>
  <div class="list-item">
    <span style="color: #333">{{ username }}</span>
    <span style="margin-left: 10px; font-size: 12px">{{ format(date) }}</span>
    <div style="margin: 5px 0">{{ content }}</div>
    <div class="line"></div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";

export default {
  name: "CommentItem",

  props: ["username", "date", "content"],
  data() {
    return {};
  },

  methods: {
    format(dateTime) {
      console.log("dateTime: ", dateTime);
      return dateFormat("YYYY-mm-dd HH:MM:SS", new Date(dateTime));
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 100%;
  margin-top: 20px;

  .line {
    height: 1px;
    background-color: #ddd;
  }
}
</style>
