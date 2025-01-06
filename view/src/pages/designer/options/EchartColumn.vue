<template>
  <div>
    <el-row>
      <el-col :span="8">数据</el-col>
      <el-col :span="16">
        <el-select v-model="globalStore.config.datafileId"> <el-option v-for="item in datafilecols" :key="i" :label="item.rawname" :value="item.id" /> </el-select
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">X轴</el-col>
      <el-col :span="16">
        <el-select v-model="globalStore.config.xCols" multiple>
          <el-option :value="item.colname" v-for="(item, i) in coldata" :key="i" :label="item.colname" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Y轴</el-col>
      <el-col :span="16">
        <el-select v-model="globalStore.config.yCols" multiple>
          <el-option :value="item.colname" v-for="(item, i) in coldata" :key="i" :label="item.colname" />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import * as utils from "@/utils/utils";
import $ from "jquery";
import { toRaw } from "vue";
const route = useRoute();
const globalStore = useGlobalStore();

// 5-4 选中的数据文件
const activeDatafile = ref("");
// 5-5 图表文件列数据
const datafilecols = ref([]);
// 5-6 列数据
const coldata = ref([]);

// 监视数据文件变化
watch(
  () => globalStore.config.datafileId,
  (nv, ov) => {
    const aaa = datafilecols.value.filter((item, index) => item.id === nv);
    if (aaa && aaa.length > 0) {
      coldata.value = aaa[0].cols;
    }
  }
);

// 监视图表配置变化
watch(
  () => globalStore.config,

  (nv, ov) => {
    // 1 根据xCols对xAxis赋值
    globalStore.option.xAxis = [];
    for (const xCol of "xCols" in globalStore.config ? globalStore.config.xCols : []) {
      const index = globalStore.config.columns.findIndex((item) => item === xCol);
      console.log("x轴数据", index, globalStore.config.dataset[index]);
      const obj = {
        show: true,
        type: "category",
        name: xCol,
        nameLocation: "center",
        nameGap: 35,
        axisLabel: { show: true },
        nameTextStyle: { fontSize: 20 },
        data: globalStore.config.dataset[index],
      };
      globalStore.option.xAxis.push(obj);
    }
    // 2 根据yCols对series赋值
    globalStore.option.series = [];
    for (const xCol of "yCols" in globalStore.config ? globalStore.config.yCols : []) {
      const index = globalStore.config.columns.findIndex((item) => item === xCol);
      const obj = {
        data: globalStore.config.dataset[index],
        type: "line",
        name: xCol,
        nameGap: 50,
        lineStyle: {},
        label: { show: true, fontSize: 12 },
        showSymbol: true,
        symbolSize: 8,
      };
      globalStore.option.series.push(obj);
    }
  },
  { deep: true }
);

// 加载数据文件列表
const load_datafilecols = async () => {
  const resp = await $post("/api/datafile/loadallcols", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    datafilecols.value = resp.data;
  }
};

onMounted(() => {
  // 6-3 加载数据文件列
  load_datafilecols();
});
</script>
<style lang="less" scoped></style>
