<template>
  <div class="designer-page">
    <el-container class="designer-container">
      <el-aside class="designer-dataset-option">
        <ToggleButton :min="15" :max="200"> </ToggleButton>
        <div class="left-part">
          <el-select v-model="globalStore.config.dataset_id" @change="handleDatasetChange">
            <el-option :value="item.id" :label="item.name" v-for="item in datasetList" :key="item.id"></el-option>
          </el-select>
          <div class="field-list">
            <div class="field-item" draggable="true" v-for="(item, i) in globalStore.config.columns" :key="i" :i="i" @dragstart="handleDragStart">{{ item }}</div>
          </div>
        </div>
      </el-aside>
      <el-aside class="designer-config-option">
        <ToggleButton :min="15" :max="200"></ToggleButton>
        <div class="designer-title">
          <el-input v-model="globalStore.config.title" placeholder="请输入标题"></el-input>
        </div>
        <div>
          <h3>图表类型</h3>
          <div class="designer-chart-types">
            <div class="chart-item" v-for="(item, i) in menu.chart_menu_configs_array()" @click="handleChartTypeClick(item)">
              <el-tooltip class="box-item" :content="item.label" placement="right" effect="dark">
              <span class="tooltip" data-tooltip="第一行&#xa第二行">{{ item.label }}</span>
              </el-tooltip>
            </div>
          </div>
        </div>
        <el-tabs tab-position="top" :stretch="true" v-model="activeLeftTabName" @tab-change="handleTabChange">
          <el-tab-pane label="数据映射" name="config">
            <div class="left-config-row">
              <el-row>
                <el-col :span="4">X轴</el-col>
                <el-col :span="20"> <DataMappingWrapper name="xAxis" :fieldList="globalStore.config.columns"></DataMappingWrapper></el-col>
              </el-row>
            </div>
            <div class="left-config-row">
              <el-row>
                <el-col :span="4">Y轴</el-col>
                <el-col :span="20"><DataMappingWrapper name="yAxis" :fieldList="globalStore.config.columns"></DataMappingWrapper> </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图表属性" name="option">
            <el-row>
              <el-col :span="8">图表</el-col>
              <el-col :span="16">
                <el-select v-model="globalStore.config.chart_id"> <el-option v-for="(item, i) in menu.chart_menu_configs_array()" :key="i" :label="item.label" :value="item.url" /> </el-select
              ></el-col>
            </el-row>
            <hr />
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
        <div class="save-option">
          <el-button type="primary" @click="saveOption">保存图表</el-button>
        </div>
      </el-aside>
      <el-main class="designer-main">
        <div id="chartviewer-page">
          <div :id="uid" class="chartviewer-chart"></div>
        </div>
      </el-main>
    </el-container>
  </div>
  <!-- 添加这一行 -->
</template>
<script setup lang="ts">
type Dataset = {
  id: string;
  cunnect_id: string;
  sql: string;
  name: string;
};
type resp_data_state = {
  columns: string[];
  datas: any[];
};
import { menu } from "@/utils/menu";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted } from "vue";
const route = useRoute();
const globalStore = useGlobalStore();

type TabNameState = "config" | "option";
const activeLeftTabName = ref<TabNameState>("config");
const handleDatasetChange = async (value: string) => {
  if (globalStore.config.dataset_id && globalStore.config.dataset_id.startsWith("dataset")) {
    const resp = await $post("/api/column/loadby", { dataset_id: globalStore.config.dataset_id });
    if (resp.code === 200) {
      const resp_data = resp.data as resp_data_state;

      globalStore.config.columns = resp_data.columns;
      globalStore.config.datas = resp_data.datas;

      console.log("加载列数据", toRaw(globalStore.config));
    }
  }
};
const handleDragStart = (event: DragEvent) => {
  if (event.target instanceof HTMLElement) {
    const i = event.target.getAttribute("i");
    event.dataTransfer.setData("i", i);
  }
};

const datasetList = ref<Dataset[]>([]);

let chart_class: IChart = null;
onMounted(async () => {
  // 4-1 设置页面标题
  console.log("4-1 设置页面标题");
  document.title = route.meta.title as string;
  // 4-2 初始化echarts实例，并初始化图表大小
  console.log("4-2 初始化echarts实例");
  init_viewer();
  // 4-3 如果current_ins为空，则为新建图表，否则为编辑图表
  if (globalStore.ins_id === "") {
    console.log("4-3 新建图表");
    chart_class = getChartWrapper(route.meta.chartid as string);
    utils.assert(chart_class instanceof IChart);
    globalStore.setOption(toRaw(chart_class.get_option()));
  } else {
    console.log("4-3 加载图表");
    // 异步执行
    setTimeout(() => {
      globalStore.setConfig(globalStore.current_ins.config);
      globalStore.setOption(globalStore.current_ins.option);
      // 因为还没有watch，必须手工调动
      renderChart();
    }, 500);
  }
  // 4-4 加载数据集列表，显示数据集下拉框
  console.log("4-4 加载数据集列表");
  load_datasets();
});
provide("FieldItemValues", (name, values) => {
  if (name === "xAxis") {
    globalStore.config.xCols = values;
  } else if (name === "yAxis") {
    globalStore.config.yCols = values;
  } else {
    console.error("接收子组件的内容，不存在的类型=", name);
  }
  console.log("接收子组件的内容", name, values);
});
// 切换选项卡时，切换watch的执行
const handleTabChange = (tabName: TabNameState) => {
  activeLeftTabName.value = tabName;
};

// 4-4 加载数据集列表，当改变下拉表时，会对config.dataset_id赋值，引起变化
const load_datasets = async () => {
  const resp = await $post("/api/dataset/loadall", { user_id: sessionStorage.getItem("token") });
  if (resp.code === 200) {
    datasetList.value = resp.data as Dataset[];
  }
};

const configWatcher = watch(
  () => globalStore.config,
  async (newVal, oldVal) => {
    if (activeLeftTabName.value === "config") {
      if (chart_class.protect()) {
        renderChart();
      }
    }
  },
  { deep: true }
);
const optionWatcher = watch(
  () => globalStore.option,
  (newVal, oldVal) => {
    if (activeLeftTabName.value === "option") {
      renderChart();
    }
  },
  { deep: true }
);

const handleChartTypeClick = (item: any) => {
  console.log("点击图表类型", item);
}
const saveOption = async () => {
  const token = sessionStorage.getItem(utils.StorageKeys.token);
  globalStore.config.user_id = token;
  globalStore.config.chart_id = route.meta.chartid as string;
  console.log("当前ins_id", globalStore.ins_id);
  const resp = await $post("/api/ins/save", { ins_id: globalStore.ins_id, config: globalStore.config, option: globalStore.option });
  if (resp.code === 200) {
    // 保存成功后，更新ins_id，否则重复保存时，记录会重复
    globalStore.ins_id = resp.data.ins_id;
    globalStore.config.ins_id = resp.data.ins_id;
    ElMessage({
      type: "success",
      message: "保存成功",
    });
  }
};
import * as echarts from "echarts";
import { IChart } from "@/utils/types";
import { assert } from "console";
const uid = ref<string>(utils.uid());
const myChart = ref<echarts.ECharts | null>(null);

const init_viewer = () => {
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

const renderChart = () => {
  if (myChart.value) {
    setTimeout(() => {
      myChart.value.setOption(globalStore.option, { notMerge: true });
    }, 100);
  }
};

const init_global_config = (): void => {
  globalStore.setConfig({
    user_id: "",
    chart_id: "",
    ins_id: "",
    title: "",
    dataset_id: "",
    xCols: [],
    yCols: [],
    columns: [],
    datas: [],
  });
};
const init_global_option = (): void => {
  globalStore.setOption({});
};

const init_global_ins = (): void => {
  globalStore.setCurrentIns({
    id: "",
    user_id: "",
    config: undefined,
    option: undefined,
  });
};
onUnmounted(() => {
  ElMessage({
    type: "success",
    message: "您已经离开当前图表编辑，请记得保存您的工作！",
  });
  globalStore.ins_id = "";
  init_global_config();
  init_global_option();
  init_global_ins();
  configWatcher();
  optionWatcher();
  myChart.value.dispose();
});
</script>
<style lang="less" scoped>
.left-config-row {
  margin-top: 20px;
}
.designer-page {
  height: 100%;

  .designer-container {
    width: 100%;
    height: 100%;

    .designer-dataset-option {
      width: var(--public_chart_option_width);
      height: 100%;
      padding: 2px;
      position: relative;
      border: 1px solid #ccc;
    }
    .designer-config-option {
      width: var(--public_chart_option_width);
      height: 100%;
      padding: 2px;
      position: relative;
      .designer-title {
        margin-top: 30px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        width: 200px;
        font-weight: bolder;
      }
      .designer-chart-types {
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        align-content: space-start;
        justify-content: space-start;
        .chart-item {
          width: 35px;
          height: 30px;
          margin: 5px;
          background-color: #eee;
          cursor: pointer;
          &:hover {
            border: 2px solid blue;
          }
        }
      }
      .save-option {
        width: var(--left_nav_width);
        .el-button {
          width: 100px;
          margin: 10px auto 0;
          display: block;
        }
      }
    }

    .designer-main {
      width: calc(100% - var(--public_chart_option_width));
      height: 100%;
      padding: 5px;

      #chartviewer-page {
        margin: 0;
        width: calc(100%);
        height: calc(100%);
        border: 1px solid #ccc;
      }
    }
  }
}
.left-part {
  margin-top: 30px;
  color: red;
  .field-list {
    margin-top: 20px;
    min-height: 50px;
    .field-item {
      border: 2px solid #fff;
      padding: 5px;
      background-color: rgba(230, 230, 230, 0.5);
      cursor: pointer;
    }
  }
}
</style>
