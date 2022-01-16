<template>
  <div class="search-center">
    <span>工作空间</span>
    <WorkspaceSelect />
  </div>
</template>

<script>
import WorkspaceSelect from "@/components/WorkspaceSelect.vue";

export default {
  name: "SearchCenter",

  components: { WorkspaceSelect },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.search-center {
  width: 100%;
}
</style>
