<template>
  <div class="chartandconfig-outer">
    <el-container class="cc-container">
      <el-aside class="cc-aside">
        <el-tabs model-value="Config">
          <el-tab-pane label="说明" name="Remrak"
            ><ChartArticle :chartid="chartid"
          /></el-tab-pane>
          <el-tab-pane label="数据" name="Data"
            ><ChartData :chartid="chartid"
          /></el-tab-pane>
          <el-tab-pane label="配置" name="Config">
            <el-tabs tab-position="left" model-value="title">
              <el-tab-pane label="标题" name="title">
                <EchartTitle />
              </el-tab-pane>
              <el-tab-pane label="画布" name="grid">
                <EchartGrid />
              </el-tab-pane>
              <el-tab-pane label="主题" name="color">
                <EchartTheme />
              </el-tab-pane>
              <el-tab-pane label="图例" name="legend">
                <EchartLegend />
              </el-tab-pane>
              <el-tab-pane label="X轴" name="xAxis">
                <EchartXAxis />
              </el-tab-pane>
              <el-tab-pane label="Y轴" name="yAxis">
                <EchartYAxis />
              </el-tab-pane>
              <el-tab-pane label="数据" name="series">
                <EchartSeriesRadar />
              </el-tab-pane>
            </el-tabs>
            <UpdateOption />
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-main class="cc-main">
        <ChartViewer :dataSource="dataSource" />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
const globalStore = useGlobalStore();
const chartid = ref("radar/BasicRadarChart");
let dataSource = reactive({});

onMounted(async () => {
  dataSource.value = await get_options(chartid.value);
  globalStore.setOption(dataSource.value);
});
</script>
<style lang="less" scoped></style>
