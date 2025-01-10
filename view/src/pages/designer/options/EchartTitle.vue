<!-- 标题  -->
<template>
  <el-form style="max-width: 600px">
    <div v-for="(title, i) in globalStore.option.title" :key="i">
      <template v-if="globalStore.option.title.length > 1">
        <h5>第{{ i + 1 }}个</h5>
        <hr />
      </template>
      <el-form-item label="显示">
        <el-switch v-model="title.show" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="title.text" />
      </el-form-item>
      <el-form-item label="位置">
        <div class="position-container">
          水平
          <el-input v-model="title.left"></el-input>
        </div>
        <div class="position-container">
          垂直
          <el-input v-model="title.top"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="字体颜色" v-if="title.textStyle">
        <el-color-picker v-model="title.textStyle.color" />
      </el-form-item>
      <el-form-item label="字体粗细" v-if="title.textStyle">
        <el-slider v-model="title.textStyle.fontWeight" :min="100" :max="900" :step="100" />
      </el-form-item>
      <el-form-item label="字体类别" v-if="title.textStyle">
        <el-select v-model="title.textStyle.fontFamily">
          <el-option v-for="(item, i) in utils.titleTextStyleFontFamilies" :key="i" :label="item.label" :value="item.value"
            ><div :style="{ fontFamily: item.value }">
              {{ item.label }}
            </div></el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="字体大小" v-if="title.textStyle">
        <el-slider v-model="title.textStyle.fontSize" :min="10" :max="80" :step="1" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { utils } from "@/utils/utils";
const globalStore = useGlobalStore();
const route = useRoute();
</script>
<style lang="less" scoped></style>
