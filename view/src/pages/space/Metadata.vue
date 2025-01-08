<template>
  <vxe-modal resize show-footer show-confirm-button show-cancel-button show-maximize v-model="props.showPopup" title="元数据" height="400" width="400" @confirm="saveMetadata">
    <vxe-table border ref="metaTableRef" height="100%" :row-config="{ keyField: 'id' }" :edit-config="{ mode: 'row', trigger: 'click' }" :data="metaDataTable">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="colname" title="列名称" min-width="100"></vxe-column>
      <vxe-column field="coltype" title="列类型" width="100" :edit-render="coltypeEditRender"></vxe-column>
      <vxe-column field="colstyle" title="列作用" width="100" :edit-render="colstyleEditRender"></vxe-column>
    </vxe-table>
  </vxe-modal>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";

const props = defineProps({
  showPopup: {
    type: Boolean,
    default: false,
    required: true,
  },
  rowId: {
    type: String,
    default: "",
    required: true,
  },
});

// 数据集id
let dataset_id = "";

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
    dataset_id: dataset_id,
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

const loadMetadata = async () => {
  const resp = await $post("/api/column/load", {
    dataset_id: props.rowId,
  });
  if (resp.code === 200) {
    metaDataTable.value = resp.data.map((item) => ({
      id: item.id,
      colname: item.colname,
      coltype: item.coltype,
      colstyle: item.colstyle,
      dataset_id: item.dataset_id,
    }));
  }
};

watch(
  () => props.showPopup,
  async (newVal, oldVal) => {
    if (newVal) {
      loadMetadata();
    }
  }
);
</script>
<style lang="less" scoped></style>
