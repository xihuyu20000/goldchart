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
            <div>
              <el-row>
                <el-col :span="8">数据</el-col>
                <el-col :span="16">
                  <el-select v-model="chart_config.datafileId"> <el-option v-for="item in datafilecols" :key="i" :label="item.rawname" :value="item.id" /> </el-select
                ></el-col>
              </el-row>
              <el-row>
                <el-col :span="8">X轴</el-col>
                <el-col :span="16">
                  <el-select v-model="chart_config.xCols" multiple>
                    <el-option :value="item.colname" v-for="(item, i) in coldata" :key="i" :label="item.colname" />
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">Y轴</el-col>
                <el-col :span="16">
                  <el-select v-model="chart_config.yCols" multiple>
                    <el-option :value="item.colname" v-for="(item, i) in coldata" :key="i" :label="item.colname" />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="属性">
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
              <el-tab-pane label="图例" name="legend" v-if="'legend' in chart_option">
                <EchartLegend />
              </el-tab-pane>
              <el-tab-pane label="X轴" name="xAxis" v-if="'xAxis' in chart_option">
                <EchartXAxis />
              </el-tab-pane>
              <el-tab-pane label="Y轴" name="yAxis" v-if="'yAxis' in chart_option">
                <EchartYAxis />
              </el-tab-pane>
              <el-tab-pane label="数据" name="series" v-if="'series' in chart_option">
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
// 5-3 图表配置
const chart_config = reactive({});
const chart_option = reactive({});
// 5-4 选中的数据文件
const activeDatafile = ref("");
// 5-5 图表文件列数据
const datafilecols = ref([]);
// 5-6 列数据
const coldata = ref([]);

// 加载数据文件列表
const load_datafilecols = async () => {
  const resp = await $post("/api/datafile/loadallcols", {
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
  const { config, option } = await get_options(route.meta.chartid);
  Object.assign(chart_config, config);
  Object.assign(chart_option, option);

  // 6-3 加载数据文件列
  load_datafilecols();
});
// 监视数据文件变化
watch(
  () => chart_config.datafileId,
  (newVal, oldVal) => {
    const aaa = datafilecols.value.filter((item, index) => item.id === newVal);
    if (aaa && aaa.length > 0) {
      coldata.value = aaa[0].cols;
    }
  }
);

// 监视图表配置变化
watchEffect(() => {
  // 1 根据xCols对xAxis赋值
  chart_option.xAxis = [];
  for (const xCol of "xCols" in chart_config ? chart_config.xCols : []) {
    const index = chart_config.columns.findIndex((item) => item === xCol);
    console.log("x轴数据", index, chart_config.dataset[index]);
    const obj = {
      show: true,
      type: "category",
      name: xCol,
      nameLocation: "center",
      nameGap: 35,
      axisLabel: { show: true },
      nameTextStyle: { fontSize: 20 },
      data: chart_config.dataset[index],
    };
    chart_option.xAxis.push(obj);
  }
  // 2 根据yCols对series赋值
  chart_option.series = [];
  for (const xCol of "yCols" in chart_config ? chart_config.yCols : []) {
    const index = chart_config.columns.findIndex((item) => item === xCol);
    const obj = {
      data: chart_config.dataset[index],
      type: "line",
      name: xCol,
      nameGap: 50,
      lineStyle: {},
      label: { show: true, fontSize: 12 },
      showSymbol: true,
      symbolSize: 8,
    };
    chart_option.series.push(obj);
  }
});
watch(
  () => chart_option,
  (newVal, oldVal) => {
    // 4 保存到全局store中
    globalStore.setConfig(chart_config);
    globalStore.setOption(chart_option);
  },
  { deep: true }
);
</script>
<style lang="less" src="./ChartDesigner.less" scoped></style>
