<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="180">
    <el-autocomplete
      width="100%"
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入用户关键词搜索"
      @select="handleSelect"
    />
    <template #reference>
      <div class="detail-button" @click="visible = true">
        <span class="iconfont">&#xe688;</span>
        <span>负责人</span>
      </div>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: "Owner",

  props: ["todoItem"],
  data() {
    return {
      visible: false,

      state: "",
    };
  },

  methods: {
    // 查询系统中可用的人员
    querySearchAsync(queryString) {
      console.log(queryString);
    },

    // 更新 todo item 所属人
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
