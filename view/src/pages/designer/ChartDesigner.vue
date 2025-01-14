<template>
  <div class="designer-page">
    <el-container class="designer-container">
      <!-- 左侧数据集选择区 -->
      <el-aside class="designer-dataset-option">
        <ToggleButton :min="20" :max="200"> </ToggleButton>
        <div class="left-part">
          <el-select v-model="globalStore.config.dataset_id" @change="handleDatasetChange">
            <el-option :value="item.id" :label="item.name" v-for="item in globalStore.datasetList" :key="item.id"></el-option>
          </el-select>
          <div class="preview-dataset"  v-show="globalStore.config.columns.length>0"><a href="#" @click="showPreviewData">预览数据</a></div>
          <div class="field-list">
            <div class="field-item" draggable="true" v-for="(item, i) in globalStore.config.columns" :key="i" :i="i" @dragstart="handleDragStart">{{ item }}</div>
          </div>
        </div>
      </el-aside>
      <!-- 左侧图表配置区 -->
      <el-aside class="designer-config-option">
        <ToggleButton :min="20" :max="200"></ToggleButton>
        <div class="designer-title">
          <el-input v-model="globalStore.config.title" placeholder="请输入标题"></el-input>
        </div>
        <div style="margin-top: 10px;">
          <h2 @click="isShowChartTypes=!isShowChartTypes" style="cursor: pointer;">图表类型</h2>
          <div class="designer-chart-types" v-show="isShowChartTypes">
            <div class="chart-item" v-for="(item, i) in menu.chart_menu_configs_array()" @click="handleChartTypeClick(item)">
              <el-tooltip class="box-item" :content="item.label" placement="right" effect="dark"  :show-after="800"  :offset="16">
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
                <el-col :span="20"> <DataMapping name="xAxis" :fieldList="globalStore.config.columns"></DataMapping></el-col>
              </el-row>
            </div>
            <div class="left-config-row">
              <el-row>
                <el-col :span="4">Y轴</el-col>
                <el-col :span="20"><DataMapping name="yAxis" :fieldList="globalStore.config.columns"></DataMapping> </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图表属性" name="option">
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
      <!-- 右侧图表显示区 -->
      <el-main class="designer-main">
        <ChartViewer></ChartViewer>
      </el-main>
    </el-container>
    <vxe-modal v-model="isShowPreviewData" title="预览数据" resize destroy-on-close show-footer show-confirm-button show-cancel-button  width="60vw" height="60vh" :confirm-closable="false" >
      <vxe-grid v-bind="previewGridOptions"></vxe-grid>
    </vxe-modal>
  </div>
  <!-- 添加这一行 -->
</template>
<script setup lang="ts">
import { menu } from "@/utils/menu";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted } from "vue";
import { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {handleDatasetChange, handleDragStart, load_datasets, saveOption, init_global_config, init_global_option} from "./ChartDesigner"
const route = useRoute();
const globalStore = useGlobalStore();

type TabNameState = "config" | "option";

globalStore.setConfig({user_id:sessionStorage.getItem("token"),chart_id:route.meta.chartid as string} as Config)

const activeLeftTabName = ref<TabNameState>("config");

const isShowChartTypes=ref<boolean>(false);
const isShowPreviewData = ref<boolean>(false);
let previewGridOptions = null;
const showPreviewData = async () => {
  const resp = await $post('/api/dataset/readata', {dataset_id:globalStore.config.dataset_id as string});
  const grid_columns = resp.columns.map(item => ({field: item, title: item}));
  const grid_datas = resp.datas.slice(0, 100).map((item) =>
    resp.columns.reduce((obj, key, index) => {
      obj[key] = item[index];
      return obj;
    }, {})
  );
  
  previewGridOptions = reactive<VxeGridProps<any>>({

  border: true,
  height: '100%',
  rowConfig: {
    keyField: 'id'
  },
  columns: grid_columns,
  data: grid_datas,
  pagerConfig:{enabled:true},
});
  isShowPreviewData.value=true;
}

onMounted(async () => {
  document.title = route.meta.title as string;

  load_datasets();
});

// 切换选项卡时，切换watch的执行
const handleTabChange = (tabName: TabNameState) => {
  activeLeftTabName.value = tabName;
};

const handleChartTypeClick = (item: any) => {
  console.log("点击图表类型", item);
}

import { Config} from "@/utils/types";

onUnmounted(() => {
  ElMessage({
    type: "success",
    message: "您已经离开当前图表编辑，请记得保存您的工作！",
  });
  globalStore.ins_id = "";
  init_global_config();
  init_global_option();

});
</script>
<style lang="less" scoped>

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
      .left-config-row {
        margin-bottom: 15px;
      }
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
          width: 47px;
          height: 40px;
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

    }
  }
}
.left-part {
  margin-top: 30px;
  color: red;
  .preview-dataset{
    margin:5px 10px;
    a{
      text-decoration: none;
    }
  }
  .field-list {
    margin-top: 5px;
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
