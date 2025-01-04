<template>
  <div class="chart-page">
    <el-container class="chart-container">
      <el-aside class="chart-option">
        <ToggleButton :min="10" :max="300"></ToggleButton>
        <div>
          <select v-model="activeDatafile">
            <option :value="item.id" v-for="(item, i) in datafilecols" :key="i">
              {{ item.rawname }}
            </option>
          </select>
        </div>
        <div class="chart-title">
          {{ $route.meta.title }}
        </div>
        <el-tabs tab-position="left" model-value="title">
          <el-tab-pane label="标题" name="title">
            <EchartTitle />
          </el-tab-pane>
          <el-tab-pane label="画布" name="grid" v-if="'grid' in chart_option">
            <EchartGrid />
          </el-tab-pane>
          <el-tab-pane label="主题" name="color">
            <EchartTheme />
          </el-tab-pane>
          <el-tab-pane
            label="图例"
            name="legend"
            v-if="'legend' in chart_option"
          >
            <EchartLegend />
          </el-tab-pane>
          <el-tab-pane label="X轴" name="xAxis" v-if="'xAxis' in chart_option">
            <EchartXAxis />
          </el-tab-pane>
          <el-tab-pane label="Y轴" name="yAxis" v-if="'yAxis' in chart_option">
            <EchartYAxis />
          </el-tab-pane>
          <el-tab-pane
            label="数据"
            name="series"
            v-if="'series' in chart_option"
          >
            <EchartSeriesLine />
          </el-tab-pane>
        </el-tabs>
        <UpdateOption />
      </el-aside>
      <el-main class="chart-main">
        <div id="chartviewer-page">
          <div :id="chartid" class="chartviewer-chart"></div>
        </div>
      </el-main>
    </el-container>
  </div>
  <!-- 添加这一行 -->
</template>
<script setup>
import * as utils from "@/utils/utils";
import * as echarts from "echarts";
import $ from "jquery";
import { ref } from "vue";
const route = useRoute();
const globalStore = useGlobalStore();
// 5-1 图像id
const chartid = ref(utils.uid());
// 5-2 图表实例
const myChart = ref({});
// 5-3 图表配置
let chart_option = reactive({});
// 5-4 选中的数据文件
const activeDatafile = ref("");
// 5-5 图表文件列数据
const datafilecols = ref([]);
// 5-6 列数据
const coldata = ref([]);

const init_chart_size = () => {
  // 2-1 初始化窗口大小
  const h = document.getElementById("chartviewer-page").offsetHeight;
  const w = document.getElementById("chartviewer-page").offsetWidth;
  // 2-2 基于准备好的dom，初始化echarts实例
  myChart.value = echarts.init(document.getElementById(chartid.value), null, {
    width: w,
    height: h,
  });
};

// 加载数据文件列表
const load_datafilecols = async () => {
  const resp = await $post("/api/datafile/loadall", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    datafilecols.value = resp.data;
  }
};

onMounted(async () => {
  // 6-1 设置页面标题
  document.title = route.meta.title;
  // 6-2 获取数据， 并保存到option中
  const dataset = await get_options(route.meta.chartid);
  // 6-3 加载数据文件列
  load_datafilecols();
  // 6-4 响应式赋值
  Object.assign(chart_option, dataset);
  // 6-5 保存到全局store中
  globalStore.setOption(chart_option);
  // 6-6 初始化图表大小
  init_chart_size();
});
watch(
  () => activeDatafile.value,
  (newVal, oldVal) => {
    globalStore.setActiveDatafile(datafilecols.value);
    const aaa = datafilecols.value.filter((item, index) => item.id === newVal);
    coldata.value = aaa[0].cols;
  }
);
watch(
  () => globalStore.option,
  (newVal, oldVal) => {
    myChart.value.setOption(newVal);
  }
);
</script>
<style lang="less" scoped>
.chart-page {
  height: 100%;
  background-color: rgba(230, 250, 230, 0.5);

  .chart-container {
    width: 100%;
    height: 100%;
    .chart-data {
      width: var(--public_chart_data_width);
      height: 100%;
      padding: 10px;
    }
    .chart-option {
      width: var(--public_chart_option_width);
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
      width: calc(100% - var(--public_chart_option_width));
      height: 100%;
      padding: 5px;
      background-color: #d7d6d6;
    }
  }
}

#chartviewer-page {
  width: calc(100%);
  height: calc(100%);
  background-color: #fff !important;
}
</style>
