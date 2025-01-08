<template>
  <vxe-modal
    resize
    show-footer
    show-confirm-button
    show-cancel-button
    show-maximize
    v-model="showPopupRef"
    title="元数据"
    height="400"
    width="400"
    @confirm="saveMetadata"
  >
    <vxe-table
      border
      ref="metaTableRef"
      height="100%"
      :row-config="{ keyField: 'id' }"
      :edit-config="{ mode: 'row', trigger: 'click' }"
      :data="metaDataTable"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="colname" title="列名称" min-width="100"></vxe-column>
      <vxe-column
        field="coltype"
        title="列类型"
        width="100"
        :edit-render="coltypeEditRender"
      ></vxe-column>
      <vxe-column
        field="colstyle"
        title="列作用"
        width="100"
        :edit-render="colstyleEditRender"
      ></vxe-column>
    </vxe-table>
  </vxe-modal>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";

import { v4 as uuidv4 } from "uuid";
// 数据文件id
let datafile_id = "";

const showPopupRef = ref(false);
const metaTableRef = ref();
const metaDataTable = ref([]);

const coltypeEditRender = reactive({
  name: "VxeSelect",
  options: [
    { label: "数字", value: "number" },
    { label: "文字", value: "text" },
    { label: "日期", value: "date" },
  ],
});
const colstyleEditRender = reactive({
  name: "VxeSelect",
  options: [
    { label: "维度", value: "dimension" },
    { label: "数值", value: "measure" },
  ],
});

const saveMetadata = async () => {
  // 发送请求
  const resp = await $post("/api/column/save", {
    datafile_id: datafile_id,
    columns: metaDataTable.value,
  });
  if (resp.code === 200) {
    console.log(resp.data);
    ElMessage({
      type: "success",
      message: "保存成功",
    });
  }
};

onMounted(() => {
  emitter.on("show-popup-event", async (rowid) => {
    datafile_id = rowid;
    const resp = await $post("/api/column/load", {
      datafile_id: datafile_id,
    });
    if (resp.code === 200) {
      metaDataTable.value = resp.data.map((item) => ({
        id: item.id,
        colname: item.colname,
        coltype: item.coltype,
        colstyle: item.colstyle,
        datafile_id: item.datafile_id,
      }));
      showPopupRef.value = true;
    }
  });
});
onUnmounted(() => {
  emitter.off("show-popup-event");
});
</script>
<style lang="less" scoped></style>
