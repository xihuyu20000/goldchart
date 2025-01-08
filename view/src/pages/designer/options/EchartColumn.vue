<template>
  <div>
    <el-row>
      <el-col :span="8">数据</el-col>
      <el-col :span="16">
        <el-select v-model="globalStore.config.datafile_id"> <el-option v-for="(item, i) in datafilecols" :key="i" :label="item.rawname" :value="item.id" /> </el-select
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
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, toRaw, watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/utils/global";
import { ElMessage } from "element-plus";

const route = useRoute();
const globalStore = useGlobalStore();

// 5-5 图表文件列数据
interface Col {
  id: string;
  colname: string;
  coltype: string;
  colstyle: string;
  datafile_id: string;
}
interface DatafileCol {
  id: string;
  rawname: string;
  fpath: string;
  user_id: string;
  project_id: string;
  project_name: string;
  cols: Col[];
}
const datafilecols = ref<DatafileCol[]>([]);
// 5-6 列数据
const coldata = ref<Col[]>([]);
// 加载数据文件列表
const load_datafilecols = async () => {
  const resp = await $post("/api/datafile/loadallcols", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    datafilecols.value = resp.data as DatafileCol[];
    console.log("加载数据文件列", datafilecols.value);
  }
};

// 监视数据文件变化，只有值变化后才触发重新加载列数据
const datafileIdWatcher = watch(
  () => globalStore.config.datafile_id,
  (nv, ov) => {
    if (nv && nv != ov) {
      coldata.value = datafilecols.value.find((item: DatafileCol) => item.id === nv).cols;
    }
  }
);

onMounted(() => {
  // 6-3 加载数据文件列
  load_datafilecols();
});
onUnmounted(() => {
  // 6-4 移除监视器
  datafileIdWatcher();
});
</script>
<style lang="less" scoped></style>
