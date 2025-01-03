<template>
  <div>
    <vxe-table
      ref="xTable"
      border
      highlight-current-row
      show-overflow
      :data="tableData"
    >
      <vxe-column type="seq" width="50"></vxe-column>
      <vxe-column field="rawname" title="文件名称" min-width="100"></vxe-column>
      <vxe-column field="fpath" title="文件路径" min-width="200"></vxe-column>
      <vxe-column field="active" title="按钮" width="200">
        <template #default="{ row }">
          <vxe-button
            mode="text"
            status="success"
            @click="activateCurrentRow(row)"
            >选中</vxe-button
          >
          <vxe-button mode="text" status="warning" @click="popupMetaData(row)"
            >元数据</vxe-button
          >
          <vxe-button mode="text" status="error" @click="removeCurrentRow(row)"
            >删除</vxe-button
          >
        </template>
      </vxe-column>
    </vxe-table>
  </div>
  <Metadata></Metadata>
</template>

<script setup>
import { emitter } from "@/utils/bus.js";
import Metadata from "./components/Metadata.vue";
import * as utils from "@/utils/utils.js";
import { $post } from "@/utils/http";
import { ElMessage, ElMessageBox } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
import { useRouter } from "vue-router";
const router = useRouter();
const xTable = ref(null);
const tableData = ref([]);

const activateCurrentRow = (row) => {
  // 选中并使用当前数据文件
  const index = tableData.value.findIndex((item) => item.id === row.id);
  xTable.value.setCurrentRow(tableData.value[index]);
  utils.setLocalItem({
    current_datafile_id: row.id,
  });
};

const popupMetaData = async (row) => {
  emitter.emit("show-popup-event", row.id);
};
const removeCurrentRow = (row) => {
  // 删除当前行
  ElMessageBox.confirm("确认删除当前数据文件吗？").then(async (confirm) => {
    if (confirm) {
      const resp = await $post("/api/datafiles/remove", {
        file_id: row.id,
      });
      if (resp.code === 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        xTable.value.remove(row);
      } else {
        ElMessage.error("删除失败");
      }
    }
  });
};

onMounted(async () => {
  // 3-1 获取数据文件列表
  const resp = await $post("/api/datafiles/loadall");
  if (resp.code === 200) {
    tableData.value = resp.data;
  }
  // 3-2 获取当前数据文件id
  const current_datafile_id = utils.getLocalItem("current_datafile_id");
  // 3-3 设置当前行
  if (current_datafile_id) {
    const index = tableData.value.findIndex(
      (item) => item.id === current_datafile_id
    );
    xTable.value.setCurrentRow(tableData.value[index]);
  }
});
</script>

<style lang="less" scoped></style>
