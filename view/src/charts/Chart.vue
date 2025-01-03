<template>
  <div class="chart-page">
    <el-container class="chart-container">
      <el-aside class="chart-aside">
        <ToggleButton :min="10" :max="300"></ToggleButton>
        <div class="chart-title">
          {{ $route.meta.title }}
        </div>
        <el-tabs tab-position="left" model-value="title">
          <el-tab-pane label="标题" name="title">
            <EchartTitle />
          </el-tab-pane>
          <el-tab-pane label="画布" name="grid" v-if="'grid' in option">
            <EchartGrid />
          </el-tab-pane>
          <el-tab-pane label="主题" name="color">
            <EchartTheme />
          </el-tab-pane>
          <el-tab-pane label="图例" name="legend" v-if="'legend' in option">
            <EchartLegend />
          </el-tab-pane>
          <el-tab-pane label="X轴" name="xAxis" v-if="'xAxis' in option">
            <EchartXAxis />
          </el-tab-pane>
          <el-tab-pane label="Y轴" name="yAxis" v-if="'yAxis' in option">
            <EchartYAxis />
          </el-tab-pane>
          <el-tab-pane label="数据" name="series" v-if="'series' in option">
            <EchartSeriesLine />
          </el-tab-pane>
        </el-tabs>
        <UpdateOption />
      </el-aside>
      <el-main class="chart-main">
        <ChartViewer />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import * as utils from "@/utils/utils.js";

const route = useRoute();
const globalStore = useGlobalStore();

let option = reactive({});

onMounted(async () => {
  // 1 获取数据， 并保存到option中
  const dataset = await get_options(route.meta.chartid);
  // 2 响应式赋值
  Object.assign(option, dataset);
  // 3 保存到全局store中
  globalStore.setOption(option);
  // 4 设置页面标题
  document.title = route.meta.title;
});
</script>
<style lang="less" scoped>
.chart-page {
  height: 100%;
  background-color: rgba(230, 250, 230, 0.5);
  .chart-container {
    width: 100%;
    height: 100%;
    .chart-aside {
      width: var(--public_chart_config_width);
      height: 100%;
      padding: 10px;
      position: relative;

      .chart-title {
        text-align: center;
        height: 30px;
        width: 280px;
        font-weight: bolder;
      }
    }
    :deep(.el-collapse-item__header) {
      height: 30px;
      border: 0;
      background-color: rgba(230, 250, 230, 0.5);

      font-size: 12px;
      padding-left: 5px;
    }
    :deep(.el-collapse-item__content) {
      padding-bottom: 0;
      background-color: rgba(230, 250, 230, 0.2);
    }
    :deep(.el-divider) {
      margin: 0;
    }
    :deep(.el-form-item) {
      height: 25px;
      margin-bottom: 8px;
    }

    :deep(.el-tabs__header-vertical) {
      width: 50px;
    }
    :deep(.el-tabs__item) {
      height: 30px;
      width: 50px;
    }
    .chart-main {
      width: calc(100% - var(--public_chart_config_width));
      height: 100%;
      padding: 5px;
      background-color: #d7d6d6;
    }
  }
}
</style>
