<template>
  <div class="chart-page">
    <el-container class="chart-container">
      <el-aside class="chart-option">
        <ToggleButton :min="10" :max="200"></ToggleButton>
        <div class="chart-title">
          <el-input v-model="globalStore.config.title" placeholder="请输入标题"></el-input>
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
        <div class="save-option">
          <el-button type="primary" @click="saveOption">保存图表</el-button>
        </div>
      </el-aside>
      <el-main class="chart-main">
        <ChartViewer />
      </el-main>
    </el-container>
  </div>
  <!-- 添加这一行 -->
</template>
<script setup lang="ts">
import { Config, Ins } from "@/utils/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted } from "vue";
const route = useRoute();
const globalStore = useGlobalStore();
onMounted(async () => {
  // 2-1 设置页面标题
  document.title = route.meta.title as string;
  // 2-2 如果current_ins为空，则为新建图表，否则为编辑图表
  if (globalStore.ins_id === "") {
    // 2-4 渲染图像
    get_options(route.meta.chartid as string);
  } else {
    // 2-3 构建图表配置和图表选项
    setTimeout(() => {
      let startTime = Date.now();
      globalStore.setConfig(globalStore.current_ins.config);
      globalStore.setOption(globalStore.current_ins.option);
      let endTime = Date.now();
      console.log(`代码运行时间：${endTime - startTime}毫秒`);
    }, 500);
  }
});
onUnmounted(() => {
  ElMessage({
    type: "success",
    message: "您已经离开当前图表编辑，请记得保存您的工作！",
  });
  globalStore.ins_id = "";
  globalStore.setConfig({
    user_id: "",
    chart_id: "",
    ins_id: "",
    title: "",
    datafile_id: "",
    xCols: [],
    yCols: [],
    columns: [],
    dataset: [],
  });
  globalStore.setOption({});
  globalStore.setCurrentIns({
    id: "",
    user_id: "",
    config: undefined,
    option: undefined
  });
});

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
</script>
<style lang="less" src="./ChartDesigner.less" scoped></style>
