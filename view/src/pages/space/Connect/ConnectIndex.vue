<template>
  <div>
    <div>
      <vxe-button status="primary" icon="vxe-icon-add" @click="addEvent">新增</vxe-button>
    </div>
    <vxe-table border show-overflow height="400" :data="tableData">
      <vxe-column type="seq" width="50"></vxe-column>
      <vxe-column field="name" title="名称"></vxe-column>
      <vxe-column field="type" title="连接类型"></vxe-column>
      <vxe-column field="params" title="参数"></vxe-column>
      <vxe-column title="操作" width="200">
        <template #default="{ row }">
          <vxe-button mode="text" status="primary" icon="vxe-icon-edit" @click="editRow(row)">编辑</vxe-button>
          <vxe-button mode="text" status="danger" icon="vxe-icon-delete" @click="removeRow(row)">删除</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-modal resize destroy-on-close show-footer show-confirm-button show-cancel-button v-model="showPopupRef" :title="clickedRowRef.id ? '修改' : '新增'" width="60vw" height="60vh" :confirm-closable="false" @confirm="saveEvent" @cancel="showPopupRef = false">
      <ConnectForm :showing="showPopupRef" :connect="clickedRowRef"></ConnectForm>
    </vxe-modal>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
import { useRouter } from "vue-router";
class ConnectType {
  id: string;
  user_id: string;
  name: string;
  type: string;
  params: string;

  constructor(id: string, user_id: string, name: string, type: string, params: string) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.type = type;
    this.params = params;
  }
}

const tableData = ref<ConnectType[]>([]);
const showPopupRef = ref<boolean>(false);
const clickedRowRef = ref<ConnectType>({ id: "", user_id: sessionStorage.getItem("token"), name: "", type: "", params: "" });

onMounted(async () => {
  // 获取数据集列表，表格显示
  reloadEvent();
});

const reloadEvent = async () => {
  const resp = await $post("/api/connect/loadall", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    tableData.value = resp.data as ConnectType[];
  }
};
const addEvent = () => {
  showPopupRef.value = true;
  clickedRowRef.value = { id: "", user_id: sessionStorage.getItem("token"), name: "", type: "", params: "" };
};
const editRow = (row) => {
  showPopupRef.value = true;
  clickedRowRef.value = row;
};

const saveEvent = async (type, event) => {
  const resp = await $post("/api/connect/save", clickedRowRef.value);
  if (resp.code === 200) {
    showPopupRef.value = false;
    ElMessage.success("保存成功");
    reloadEvent();
  } else {
    ElMessage.error("保存失败");
  }
};
const removeRow = (row) => {
  VxeUI.modal
    .confirm({
      title: "删除提醒",
      content: "请确认要删除该行吗？\n删除之后，点击保存按钮",
    })
    .then(async (type) => {
      if (type === "confirm") {
        const resp = await $post("/api/connect/delete", {
          id: row.id,
        });
        if (resp.code === 200) {
          showPopupRef.value = false;
          ElMessage.success("删除成功");
          reloadEvent();
        } else {
          ElMessage.error("删除失败");
        }
      }
    });
};
</script>

<style lang="less" scoped></style>
