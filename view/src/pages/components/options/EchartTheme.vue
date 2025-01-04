<!-- 主题 -->
<template>
  <el-form style="max-width: 600px">
    <el-form-item label="主题色">
      <el-select v-model="globalStore.option.color">
        <el-option
          v-for="item in utils.echartOptionColor"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          ><div :style="{ backgroundColor: item.value }">&nbsp;</div>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="背景色">
      <el-select v-model="globalStore.option.backgroundColor">
        <el-option
          v-for="item in utils.echartOptionColor"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          ><div :style="{ backgroundColor: item.value }">&nbsp;</div>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文本色" v-if="globalStore.option.textStyle">
      <el-color-picker
        v-model="globalStore.option.textStyle.color"
        :show-alpha="true"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();
</script>
<style lang="less" scoped></style>
