<template>
  <div>
    <p>
      <vxe-button status="error" @click="removeCurrentRow"
        >删除数据文件</vxe-button
      >
      <vxe-button status="success" @click="activateCurrentRow"
        >选中并使用当前数据文件</vxe-button
      >
    </p>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import * as utils from "@/utils/utils.js";
import { $post } from "@/utils/http";
import { ElMessage, ElMessageBox } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
import { useRouter } from "vue-router";
const router = useRouter();

// 表格
const gridRef = ref();
const gridOptions = reactive({
  height: 300,
  rowConfig: {
    isCurrent: true,
    isHover: true,
  },
  columns: [
    { type: "seq", width: 70 },
    { field: "rawname", title: "文件名称" },
    { field: "fpath", title: "文件路径" },
  ],
  data: [],
});
const removeCurrentRow = () => {
  // 删除当前行
  const $grid = gridRef.value;
  if ($grid) {
    ElMessageBox.confirm("确认删除当前数据文件吗？").then(async (confirm) => {
      if (confirm) {
        const resp = await $post("/api/datafiles/remove", {
          file_id: $grid.getCurrentRecord().id,
        });
        if (resp.code === 200) {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          $grid.removeCurrentRow();
        } else {
          ElMessage.error("删除失败");
        }
      }
    });
  }
};
const activateCurrentRow = () => {
  // 选中并使用当前行
  const $grid = gridRef.value;
  if ($grid) {
    utils.setLocalItem({ datafile_id: $grid.getCurrentRecord().id });
  }
};

onMounted(async () => {
  // 2-1 获取数据文件列表
  const resp = await $post("/api/datafiles/loadall");
  if (resp.code === 200) {
    gridOptions.data = resp.data;
  }
  // 2-2 获取当前数据文件id
  const current_datafile_id = utils.getLocalItem("datafile_id");
  if (current_datafile_id) {
    const $grid = gridRef.value;
    if ($grid && gridOptions.data) {
      const index = gridOptions.data.findIndex(
        (item) => item.id === current_datafile_id
      );
      $grid.setCurrentRow(gridOptions.data[index]);
    }
  }
});
</script>

<style lang="less" scoped></style>
