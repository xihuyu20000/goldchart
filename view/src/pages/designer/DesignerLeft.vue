<template>
  <div class="dataset-wrapper-page">
    <div class="left-part">
      <el-select v-model="datasetId" @change="handleDatasetChange">
        <el-option :value="item.id" :label="item.name" v-for="item in datasetList" :key="item.id"></el-option>
      </el-select>
      <div class="field-list">
        <div class="field-item" draggable="true" v-for="(item, i) in fieldList" :key="i" :i="i" @dragstart="handleDragStart">{{ item.label }}</div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="right-part">
      <el-row>
        <el-col :span="4">X轴</el-col>
        <el-col :span="20"> <FieldItemWrapper name="xAxis" :fieldList="fieldList"></FieldItemWrapper></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">Y轴</el-col>
        <el-col :span="20"><FieldItemWrapper name="yAxis" :fieldList="fieldList"></FieldItemWrapper> </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
const datasetId = ref("");
const datasetList = ref([
  {
    id: 1,
    name: "学生表",
    values: [
      { label: "学生编号", value: "id" },
      { label: "学生姓名", value: "name" },
      { label: "学生年龄", value: "age" },
      { label: "学生性别", value: "gender" },
    ],
  },
  {
    id: 2,
    name: "员工表",
    values: [
      { label: "员工编号", value: "id" },
      { label: "员工姓名", value: "name" },
      { label: "员工年龄", value: "age" },
      { label: "员工性别", value: "gender" },
    ],
  },
  {
    id: 3,
    name: "部门表",
    values: [
      { label: "部门编号", value: "id" },
      { label: "部门名称", value: "name" },
    ],
  },
]);
const fieldList = ref([]);
const handleDatasetChange = (value: number) => {
  fieldList.value = datasetList.value.find((item) => item.id === value)?.values || [];
};
const handleDragStart = (event: DragEvent) => {
  if (event.target instanceof HTMLElement) {
    const i = event.target.getAttribute("i");
    event.dataTransfer.setData("i", i);
  }
};
provide("FieldItemValues", (name, values) => {
  console.log("接收子组件的内容", name, values);
});
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.dataset-wrapper-page {
  width: 100%;
  height: 100vh;
  display: flex;
  .left-part {
    width: 300px;
    color: red;
    .field-list {
      margin-top: 20px;
      .field-item {
        border: 2px solid #fff;
        padding: 10px;
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
  .divider {
    width: 10px;
    height: 100vh;
  }
  .right-part {
    width: 400px;
    color: blue;
    padding: 20px;
    .el-row {
      margin-top: 20px;
    }
  }
}
</style>
