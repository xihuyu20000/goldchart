<!--  -->
<template>
  <div>
    <el-form style="max-width: 600px">
      <div v-for="(sub, i) in globalStore.option.yAxis" :key="i">
        <template v-if="globalStore.option.yAxis.length > 1">
          <h5>第{{ i + 1 }}个</h5>
          <hr />
        </template>
        <el-form-item label="显示Y轴标题">
          <el-switch v-model="sub.show" />
        </el-form-item>
        <el-form-item label="标题文本">
          <el-input v-model="sub.name" />
        </el-form-item>
        <el-form-item label="标题对齐">
          <el-select v-model="sub.nameLocation">
            <el-option v-for="item in utils.yAxisNameLocations" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题间隔">
          <el-slider v-model="sub.nameGap" />
        </el-form-item>
        <el-form-item label="标题字号" v-if="sub.nameTextStyle">
          <el-slider v-model="sub.nameTextStyle.fontSize" />
        </el-form-item>
        <el-divider />
        <el-form-item label="刻度字号" v-if="sub.axisLabel">
          <el-slider v-model="sub.axisLabel.fontSize" />
        </el-form-item>
        <el-form-item label="刻度颜色" v-if="sub.axisLabel">
          <el-color-picker v-model="sub.axisLabel.color" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();
</script>
<style lang="less" scoped></style>
