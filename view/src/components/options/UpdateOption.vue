<!--  -->
<template>
  <div class="update-option">
    <el-button type="primary" @click="saveOption">保存图表配置</el-button>
  </div>
</template>

<script setup>
const globalStore = useGlobalStore();
function saveOption() {
  globalStore.setOption(globalStore.option);
}
</script>
<style lang="less" scoped>
.update-option {
  width: 280px;
  .el-button {
    width: 100px;
    margin: 10px auto 0;
    display: block;
  }
}
</style>
