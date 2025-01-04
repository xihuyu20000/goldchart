<!--  -->
<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      action="http://localhost:5000/api/uploadDataFile"
      :data="{ chartid: chartid }"
      :multiple="false"
      :accept="'.csv,.txt,.xls,.xlsx'"
      :max-size="500 * 1024"
      :auto-upload="true"
      :limit="1"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-button type="primary" plain>选择文件并上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          只能上传csv\txt\xls\xlsx文件，且文件大小不超过500kb
        </div>
      </template>
    </el-upload>
    <el-button @click="toggleFullScreen">全屏</el-button>
    <el-divider></el-divider>
    <el-table
      :data="df.values"
      :width="300"
      :height="400"
      class="preview-excel"
    >
      <el-table-column v-for="item in df.columns" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script setup>
import screenfull from "screenfull";

import { onMounted, reactive } from "vue";
const globalStore = useGlobalStore();

const props = defineProps({
  chartid: {
    type: String,
    required: true,
  },
});

const df = reactive({
  columns: [],
  values: [],
});

onMounted(async () => {
  const resp = await $post("/api/tabledata", { chartid: props.chartid });
  console.log("数据表格", props.chartid);
  df.columns = resp.data.columns;
  df.values = resp.data.values.map((curr, i, arr) =>
    resp.data.columns.reduce((obj, key, i) => {
      obj[key] = curr[i];
      return obj;
    }, {})
  );
});
function toggleFullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle(document.getElementsByClassName("preview-excel")[0]);
  }
}
</script>
<style lang="less" scoped></style>
