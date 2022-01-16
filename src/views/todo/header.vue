<template>
  <el-menu
    class="layout-header"
    mode="horizontal"
    background-color="#3498db"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-sub-menu index="workspace">
      <template #title>Workspace</template>

      <el-menu-item
        v-for="workspace in workspaces"
        :key="workspace.uid"
        :index="workspace.uid"
        >{{ workspace.name }}</el-menu-item
      >
    </el-sub-menu>
    <!-- <el-menu-item index="2">Processing Center</el-menu-item> -->
  </el-menu>
</template>

<script>
import store from "@/store";

export default {
  name: "Header",

  data() {
    return {};
  },
  computed: {
    workspaces: {
      get() {
        return store.getters["workspace/workspaces"];
      },
    },
  },

  created() {
    store.dispatch("workspace/list");
  },

  methods: {
    handleSelect(key, path) {
      // change workspace
      store.dispatch("workspace/changeWorkspace", { workspaceId: key });
    },
  },
};
</script>

<style scoped>
.layout-header {
  width: 100%;
  height: 100%;
}

.el-sub-menu :deep() .el-sub-menu__title {
  height: 35px;
  line-height: 35px;
}
.el-menu-item {
  height: 35px;
  line-height: 35px;
}

.el-menu--horizontal {
  border-bottom-color: #3498db;
}
</style>
