<template>
  <el-select v-model="value" placeholder="Workspace" size="large">
    <el-option
      v-for="item in workspaces"
      :key="item.uid"
      :label="item.name"
      :value="item.uid"
    >
    </el-option>
  </el-select>
</template>

<script>
import { getWorkspaces } from "@/api/workspace";

export default {
  name: "WorkspaceSelect",

  data() {
    return {
      value: "DEFAULT",

      workspaces: [],
    };
  },

  created() {
    // 获取 workspaces
    getWorkspaces().then((resp) => {
      console.log(resp);
      this.workspaces = resp;
    });
  },
};
</script>

<style lang="scss" scoped></style>
