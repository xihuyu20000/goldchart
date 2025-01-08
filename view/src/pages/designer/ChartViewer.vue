<template>
  <div id="chartviewer-page">
    <div :id="uid" class="chartviewer-chart"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { guard } from "@/utils/guard";
import { onMounted, onUnmounted, ref, toRaw, watch } from "vue";
import { useGlobalStore } from "@/utils/global";

const uid = ref<string>(utils.uid());
const myChart = ref<echarts.ECharts | null>(null);

const init = () => {
  // 2-1 初始化窗口大小
  const page = document.getElementById("chartviewer-page")!;
  let h: number = page.offsetHeight;
  let w: number = page.offsetWidth;
  // 2-2 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById(uid.value) as HTMLDivElement, null, {
    width: w,
    height: h,
  });
};

onMounted(() => {
  init();
});

const globalStore = useGlobalStore();
const configWatcher = watch(
  () => globalStore.config,
  (newVal, oldVal) => {
    if (myChart.value && guard.protect(newVal, oldVal)) {
      myChart.value.setOption(globalStore.option, { notMerge: true });
    }
  },
  { deep: true }
);

onUnmounted(() => {
  configWatcher();
  myChart.value?.dispose();
});
</script>
<style lang="less" scoped>
#chartviewer-page {
  width: calc(100%);
  height: calc(100%);
  background-color: #fff !important;
}
</style>
