<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="uploadSuccess"
    multiple
  >
    <div class="detail-button">
      <span class="iconfont">&#xe6a9;</span>
      <span>附件</span>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: "Attach",

  props: ["todoItem"],
  data() {
    return {};
  },

  methods: {
    uploadSuccess(res, file) {
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped></style>
