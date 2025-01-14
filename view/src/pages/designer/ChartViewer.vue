<template>
  <div id="chartviewer-page">
    <div class="chartviewer-toolbar">
      <el-button @click="showPreviewData">图表数据</el-button>
      <el-button @click="export_image">导出图片</el-button>
    </div>
    <div :id="uid" :style="{ width: '100%', height: '100%' }"></div>
  </div>
  <vxe-modal v-model="isShowPreviewData" title="图表数据" resize destroy-on-close show-footer show-confirm-button show-cancel-button width="60vw" height="60vh" :confirm-closable="false">
    <vxe-grid v-bind="previewGridOptions"></vxe-grid>
  </vxe-modal>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { VxeGridProps, VxeGridInstance } from "vxe-table";
import { renderChart, export_image } from "./ChartViewer";
import { IChart } from "@/utils/types";
const route = useRoute();
const globalStore = useGlobalStore();

const uid = ref<string>(utils.uid());

const chart_class: IChart = getChartWrapper(route.meta.chartid as string);
utils.assert(chart_class instanceof IChart);

onMounted(() => {
  init_viewer();
  // 4-3 如果current_ins为空，则为新建图表，否则为编辑图表
  if (globalStore.ins_id === "") {
    console.log("4-3 新建图表");
    globalStore.setOption(toRaw(chart_class.get_option()));
  } else {
    console.log("4-3 加载图表");
    // 异步执行
    setTimeout(() => {
      // 因为还没有watch，必须手工调动
      renderChart();
    }, 500);
  }
  window.addEventListener("resize", () => {
    globalStore.myChart.resize();
  });
});

const init_viewer = () => {
  // 2-2 基于准备好的dom，初始化echarts实例
  const ins = markRaw(echarts.init(document.getElementById(uid.value) as HTMLDivElement));
  globalStore.setMyChart(ins);
};
const configWatcher = watch(
  [globalStore.config, globalStore.option],
  async () => {
    if (chart_class.protect()) {
      renderChart();
    }
  },
  { deep: true }
);

const isShowPreviewData = ref<boolean>(false);
let previewGridOptions = null;
const showPreviewData = () => {
  const grid_columns = globalStore.chart.columns.map((item) => ({ field: item, title: item }));
  const grid_datas = globalStore.chart.datas.slice(0, 100).map((item) =>
    globalStore.chart.columns.reduce((obj, key, index) => {
      obj[key] = item[index];
      return obj;
    }, {})
  );

  previewGridOptions = reactive<VxeGridProps<any>>({
    border: true,
    height: "100%",
    rowConfig: {
      keyField: "id",
    },
    columns: grid_columns,
    data: grid_datas,
    pagerConfig: { enabled: true },
  });
  isShowPreviewData.value = true;
};

onUnmounted(() => {
  configWatcher();
  globalStore.myChart.dispose();
});
</script>

<style lang="less" scoped>
#chartviewer-page {
  margin: 0;
  width: calc(100%);
  height: calc(100%);
  border: 1px solid #ccc;
  .chartviewer-toolbar {
    margin: 5px;
    background-color: #eee;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
