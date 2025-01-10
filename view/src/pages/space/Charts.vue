<template>
  <div>
    <vxe-table ref="xTable" border highlight-current-row show-overflow :data="tableData">
      <vxe-column type="seq" width="50"></vxe-column>
      <vxe-column field="config.title" title="图表名称" min-width="100"></vxe-column>
      <vxe-column field="active" title="按钮" width="200">
        <template #default="{ row }">
          <vxe-button mode="text" status="warning" @click="editIns(row)">编辑</vxe-button>
          <vxe-button mode="text" status="error" @click="removeIns(row)">删除</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();
import { Ins } from "@/utils/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
const router = useRouter();
const xTable = ref(null);
const tableData = ref([]);

onMounted(async () => {
  console.log("2-1 获取实例列表");
  const resp = await $post("/api/ins/load_by_userid", {
    user_id: sessionStorage.getItem("token"),
  });
  if (resp.code === 200) {
    console.log("2-2 实例列表获取成功", resp.data);
    tableData.value = resp.data.map((item, i, arr) => {
      return {
        id: item.id,
        config: JSON.parse(item.config),
        option: JSON.parse(item.option),
      };
    });
    console.log("所有实例列表", tableData.value);
  }
});

const editIns = (ins: Ins) => {
  console.log("2-1 全局变量中记录当前实例", ins);
  globalStore.setCurrentIns(ins);
  console.log("2-2 跳转到编辑器页面");
  router.push(ins.config.chart_id);
};
const removeIns = async (ins: Ins) => {
  console.log("2-1 删除实例", ins);
  const resp = await $post("/api/ins/remove", {
    ins_id: ins.id,
  });
  if (resp.code === 200) {
    tableData.value = tableData.value.filter((item) => {
      item.id !== ins.id;
    });
    ElMessage.success("删除成功");
  } else {
    console.log("删除失败");
    ElMessage.error("删除失败");
  }
};
</script>

<style lang="less" scoped></style>
