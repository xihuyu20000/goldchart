<template>
  <div class="chart-page">
    <el-container class="chart-container">
      <el-aside class="chart-option">
        <ToggleButton :min="10" :max="300"></ToggleButton>

        <div class="chart-title">
          {{ $route.meta.title }}
        </div>
        <el-tabs tab-position="top">
          <el-tab-pane label="数据">
            <div>
              <div>
                数据文件
                <el-select v-model="activeDatafile" style="width: 150px">
                  <el-option
                    v-for="item in datafilecols"
                    :key="i"
                    :label="item.rawname"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div>
                X轴
                <el-select v-model="activeXCols" multiple style="width: 150px">
                  <el-option
                    :value="item.colname"
                    v-for="(item, i) in coldata"
                    :key="i"
                    :label="item.colname"
                  />
                </el-select>
              </div>
              <div>
                Y轴
                <el-select v-model="activeYCols" multiple style="width: 150px">
                  <el-option
                    :value="item.colname"
                    v-for="(item, i) in coldata"
                    :key="i"
                    :label="item.colname"
                  />
                </el-select>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="属性">
            <el-tabs tab-position="left" model-value="title">
              <el-tab-pane label="标题" name="title">
                <EchartTitle />
              </el-tab-pane>
              <el-tab-pane
                label="画布"
                name="grid"
                v-if="'grid' in chart_option"
              >
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
              <el-tab-pane
                label="X轴"
                name="xAxis"
                v-if="'xAxis' in chart_option"
              >
                <EchartXAxis />
              </el-tab-pane>
              <el-tab-pane
                label="Y轴"
                name="yAxis"
                v-if="'yAxis' in chart_option"
              >
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
const activeXCols = ref("");
const activeYCols = ref("");

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
  const dataset = await get_options(route.meta.chartid);
  // 6-3 加载数据文件列
  load_datafilecols();
  // 6-4 响应式赋值
  Object.assign(chart_option, dataset);
  // 6-5 保存到全局store中
  globalStore.setOption(chart_option);
});
// 监视数据文件变化
watch(
  () => activeDatafile.value,
  (newVal, oldVal) => {
    const aaa = datafilecols.value.filter((item, index) => item.id === newVal);
    coldata.value = aaa[0].cols;
  }
);
// 监视X轴变化
watch(
  () => activeXCols.value,
  (newVal, oldVal) => {
    //TODO 当字段变化时，查询数据后更新option
    chart_option.xAxis[0].data = newVal;
  }
);
// 监视Y轴变化
watch(
  () => activeYCols.value,
  (newVal, oldVal) => {
    // TODO 当字段变化时，查询数据后更新option
    chart_option.series[0].data = newVal.map((item) => item.colname);
  }
);
// 监视图表配置变化
watch(
  () => chart_option,
  (newVal, oldVal) => {
    // 6-6 保存到全局store中
    globalStore.setOption(newVal);
    console.log("chart_option", chart_option);
  },
  { deep: true }
);
</script>
<style lang="less" src="./ChartDesigner.less" scoped></style>
