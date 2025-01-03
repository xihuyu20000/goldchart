<!--  -->
<template>
  <el-form style="max-width: 600px">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="i" v-for="(sub, i) in globalStore.option.series">
        <template #title>
          <h5>{{ globalStore.option.columns[i] }}</h5>
        </template>
        <el-form-item
          label="显示数值"
          v-if="show_config('form.series.label.show', chartid)"
        >
          <el-switch v-model="sub.label.show" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script setup>
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();
console.log("EchartSeriesLine.vue");
</script>
<style lang="less" scoped></style>
