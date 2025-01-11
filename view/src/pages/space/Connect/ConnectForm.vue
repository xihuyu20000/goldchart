<template>
  <el-row>
    <el-col :span="2">名称</el-col>
    <el-col :span="4">
      <el-input v-model="props.connect.name"></el-input>
    </el-col>
    <el-col :span="2">连接类型</el-col>
    <el-col :span="4">
      <el-select v-model="props.connect.type">
        <el-option v-for="item in typeListRender" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="12"></el-col>
  </el-row>
  <vxe-textarea v-model="props.connect.params" rows="10"></vxe-textarea>
</template>
<script setup lang="ts">
import { validate } from "uuid";

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
const typeListRender = ref<any[]>([
  { label: "sqlite", value: "sqlite" },
  { label: "mysql", value: "mysql" },
]);
const props = defineProps({
  showing: {
    type: Boolean,
    default: false,
    required: true,
  },
  connect: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {});
</script>

<style lang="less" scoped></style>
