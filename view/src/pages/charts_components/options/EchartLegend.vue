<template>
  <div v-if="globalStore.option.legend">
    <el-form style="max-width: 600px">
      <el-form-item label="显示">
        <el-switch v-model="globalStore.option.legend.show" />
      </el-form-item>
      <el-form-item label="方向">
        <el-radio-group v-model="globalStore.option.legend.orient">
          <el-radio value="horizontal">水平</el-radio>
          <el-radio value="vertical">垂直</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="间隔">
        <el-slider
          v-model="globalStore.option.legend.itemGap"
          :min="10"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="宽度">
        <el-slider
          v-model="globalStore.option.legend.itemWidth"
          :min="10"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="高度">
        <el-slider
          v-model="globalStore.option.legend.itemHeight"
          :min="10"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="位置">
        <div class="position-container">
          上
          <el-tooltip
            raw-content
            content="值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'top', 'middle', 'bottom'"
            placement="bottom"
            ><el-input
              v-model="globalStore.option.legend.top"
            ></el-input> </el-tooltip
          >右<el-tooltip
            raw-content
            content="值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比"
            placement="bottom"
            ><el-input v-model="globalStore.option.legend.right"></el-input
          ></el-tooltip>
          下
          <el-tooltip
            raw-content
            content="值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比"
            placement="bottom"
          >
            <el-input v-model="globalStore.option.legend.bottom"></el-input
          ></el-tooltip>
          左<el-tooltip
            raw-content
            content="值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'"
            placement="bottom"
            ><el-input v-model="globalStore.option.legend.left"></el-input
          ></el-tooltip>
        </div>
      </el-form-item>
      <el-form-item label="字体粗细">
        <el-slider
          v-model="globalStore.option.legend.textStyle.fontWeight"
          :min="100"
          :max="900"
          :step="100"
        />
      </el-form-item>
      <el-form-item label="字体类别">
        <el-select v-model="globalStore.option.legend.textStyle.fontFamily">
          <el-option
            v-for="item in utils.titleTextStyleFontFamilies"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字体色">
        <el-color-picker v-model="globalStore.option.legend.textStyle.color" />
      </el-form-item>
      <el-form-item label="字号">
        <el-slider
          v-model="globalStore.option.legend.textStyle.fontSize"
          :min="1"
          :max="100"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();
</script>
<style lang="less" scoped></style>
