<template>
  <div id="chartviewer-page">
    <div :id="chartid" class="chartviewer-chart"></div>
  </div>
</template>
<script setup>
import * as utils from "@/utils/utils";
import * as echarts from "echarts";
// 时间戳+随机字符
const chartid = ref(utils.uid());
const myChart = ref({});

const init_chart_size = () => {
  // 1 初始化窗口大小
  let h = document.getElementById("chartviewer-page").offsetHeight;
  let w = document.getElementById("chartviewer-page").offsetWidth;
  // 2 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById(chartid.value), null, {
    width: w,
    height: h,
  });
};

onMounted(() => {
  init_chart_size();
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

#chartviewer-page {
  width: calc(100%);
  height: calc(100%);
  background-color: #fff !important;
}
</style>
