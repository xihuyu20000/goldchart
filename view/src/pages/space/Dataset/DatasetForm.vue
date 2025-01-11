<template>
  <el-row>
    <el-col :span="2">名称</el-col>
    <el-col :span="4">
      <el-input v-model="props.dataset.name"></el-input>
    </el-col>
    <el-col :span="2">连接类型</el-col>
    <el-col :span="4">
      <el-select v-model="props.dataset.connect_id">
        <el-option v-for="item in connectListRender" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="12"></el-col>
  </el-row>
  <vxe-textarea v-model="props.dataset.sql" rows="10"></vxe-textarea>
</template>
<script setup lang="ts">
type ConnectType = {
  label: string;
  value: string;
};
const connectListRender = ref<ConnectType[]>([]);
const props = defineProps({
  showing: {
    type: Boolean,
    default: false,
    required: true,
  },
  dataset: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  // 获取连接列表，用于下拉框
  const connect_resp = await $post("/api/connect/loadall", { user_id: sessionStorage.getItem("token") });
  if (connect_resp.code === 200) {
    connectListRender.value.length = 0;
    connect_resp.data.map((item) => {
      connectListRender.value.push({ label: item.name, value: item.id });
    });
  }
});
</script>

<style lang="less" scoped></style>
