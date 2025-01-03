<template>
  <div id="chartviewer-page">
    <div :id="uid" class="chartviewer-chart"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
// 时间戳+随机字符
const uid = ref(new Date().getTime() + Math.random().toString(32).slice(2, 10));
const myChart = ref({});

const init = () => {
  // 1 初始化窗口大小
  let h = document.getElementById("chartviewer-page").offsetHeight;
  let w = document.getElementById("chartviewer-page").offsetWidth;
  // 2 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById(uid.value), null, {
    width: w,
    height: h,
  });
};

onMounted(() => {
  init();
});

const globalStore = useGlobalStore();
watch(
  () => globalStore.option,
  (newVal, oldVal) => {
    myChart.value.setOption(newVal);
  }
);
</script>
<style lang="less" scoped>
.chartviewer-toolbar {
  width: 50px;
  height: calc(100% - 10px);
  background-color: #893f3f;
}
#chartviewer-page {
  width: calc(100%);
  height: calc(100%);
  background-color: #fff !important;
}
</style>
