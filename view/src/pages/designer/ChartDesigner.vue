<template>
  <div class="chart-page">
    <el-container class="chart-container">
      <el-aside class="chart-option">
        <ToggleButton :min="10" :max="200"></ToggleButton>
        <div class="chart-title">
          {{ $route.meta.title }}
        </div>
        <el-tabs tab-position="top" :stretch="true">
          <el-tab-pane label="数据">
            <EchartColumn />
          </el-tab-pane>
          <el-tab-pane label="属性">
            <el-tabs tab-position="left" model-value="title">
              <el-tab-pane label="标题" name="title">
                <EchartTitle />
              </el-tab-pane>
              <el-tab-pane label="画布" name="grid" v-if="'grid' in globalStore.option">
                <EchartGrid />
              </el-tab-pane>
              <el-tab-pane label="主题" name="color">
                <EchartTheme />
              </el-tab-pane>
              <el-tab-pane label="图例" name="legend" v-if="'legend' in globalStore.option">
                <EchartLegend />
              </el-tab-pane>
              <el-tab-pane label="X轴" name="xAxis" v-if="'xAxis' in globalStore.option">
                <EchartXAxis />
              </el-tab-pane>
              <el-tab-pane label="Y轴" name="yAxis" v-if="'yAxis' in globalStore.option">
                <EchartYAxis />
              </el-tab-pane>
              <el-tab-pane label="数据" name="series" v-if="'series' in globalStore.option">
                <EchartSeriesLine />
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
        <UpdateOption />
      </el-aside>
      <el-main class="chart-main">
        <ChartViewer />
      </el-main>
    </el-container>
  </div>
  <!-- 添加这一行 -->
</template>
<script setup>
import * as utils from "@/utils/utils";
import $ from "jquery";
import { toRaw } from "vue";
const route = useRoute();
const globalStore = useGlobalStore();
// 5-1 图像id
const chartid = ref(utils.uid());
// 5-2 图表实例
const myChart = ref({});

onMounted(async () => {
  // 2-1 设置页面标题
  document.title = route.meta.title;
  // 2-2 根据chartid调用对应的js文件，获取后台数据， 并保存到global的config和option中
  get_options(route.meta.chartid);
});
</script>
<style lang="less" src="./ChartDesigner.less" scoped></style>
