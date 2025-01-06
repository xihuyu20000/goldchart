<!--  -->
<template>
  <div class="update-option">
    <el-button type="primary" @click="saveOption">保存图表</el-button>
  </div>
</template>

<script setup>
const globalStore = useGlobalStore();
function saveOption() {
  console.log(globalStore.config);
  console.log(globalStore.option);
}
</script>
<style lang="less" scoped>
.update-option {
  width: var(--left_nav_width);
  .el-button {
    width: 100px;
    margin: 10px auto 0;
    display: block;
  }
}
</style>
