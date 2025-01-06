<template>
  <div>
    <vxe-table ref="xTable" border highlight-current-row show-overflow :data="tableData">
      <vxe-column type="seq" width="50"></vxe-column>
      <vxe-column field="config.title" title="图表名称" min-width="100"></vxe-column>
      <vxe-column field="active" title="按钮" width="200">
        <template #default="{ row }">
          <vxe-button mode="text" status="success" @click="previewIns(row)">预览</vxe-button>
          <vxe-button mode="text" status="warning" @click="editIns(row)">编辑</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <Metadata></Metadata>
</template>

<script setup>
import Metadata from "./Metadata.vue";
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();
import { ElMessage, ElMessageBox } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
const router = useRouter();
const xTable = ref(null);
const tableData = ref([]);

const previewIns = (row) => {};

const editIns = (row) => {
  // 4-1 跳转到编辑器页面
  router.push(row.config.chart_id);
  // 4-2 一定要更新全局变量
  globalStore.ins_id = row.config.ins_id;
  // 4-3 延迟更新全局变量，这样编辑器会更新数据
  setTimeout(() => {
    globalStore.setConfig(reactive(row.config));
    globalStore.setOption(reactive(row.option));
    console.log("更新globalStore");
    console.log(globalStore.config);
    console.log(globalStore.option);
  }, 1000);
};

onMounted(async () => {
  // 3-1 获取数据文件列表
  const resp = await $post("/api/ins/load_by_userid", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    console.log(resp.data);
    tableData.value = resp.data.map((item, i, arr) => {
      return {
        ins_id: item.ins_id,
        config: JSON.parse(item.config),
        option: JSON.parse(item.option),
      };
    });
  }
});
</script>

<style lang="less" scoped></style>
