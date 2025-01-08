<!--  -->
<template>
  <el-form style="max-width: 600px">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="i" v-for="(sub, i) in globalStore.option.series">
        <template #title>
          <h5>{{ globalStore.option.columns[i] }}</h5>
        </template>
        <template v-if="sub.label">
          <el-form-item label="显示数值">
            <el-switch v-model="sub.label.show" />
          </el-form-item>
          <el-form-item label="数值颜色">
            <el-color-picker v-model="sub.label.color" />
          </el-form-item>
          <el-form-item label="数值字号">
            <el-slider v-model="sub.label.fontSize" />
          </el-form-item>
          <el-form-item label="数值格式化">
            <el-tooltip raw-content content="<p>模板变量有:</p><p>{a}：系列名。</p><p>{b}：数据名。</p><p>{c}：数据值。</p><p>{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。</p><p>{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。</p>" placement="right">
              <el-input v-model="sub.label.formatter" />
            </el-tooltip>
          </el-form-item>
          <el-form-item label="数值位置">
            <el-select v-model="sub.label.position">
              <el-option v-for="item in utils.echartOptionLabelPositions" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="sub.itemStyle">
          <el-divider />
          <el-form-item label="柱条颜色">
            <el-color-picker v-model="sub.itemStyle.color" />
          </el-form-item>
          <el-divider />
          <el-form-item label="柱边颜色">
            <el-color-picker v-model="sub.itemStyle.borderColor" />
          </el-form-item>
          <el-form-item label="柱边宽度">
            <el-slider v-model="sub.itemStyle.borderWidth" />
          </el-form-item>
          <el-form-item label="柱边样式">
            <el-select v-model="sub.itemStyle.borderType">
              <el-option v-for="item in utils.seriesBarItemStyleBorderTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </template>
        <template v-if="sub.backgroundStyle">
          <el-divider />
          <el-form-item label="显示背景色">
            <el-switch v-model="sub.showBackground" />
          </el-form-item>
          <el-form-item label="背景柱条颜色">
            <el-color-picker v-model="sub.backgroundStyle.color" />
          </el-form-item>
          <el-form-item label="背景柱边颜色">
            <el-color-picker v-model="sub.backgroundStyle.borderColor" />
          </el-form-item>
          <el-form-item label="背景柱边宽度">
            <el-slider v-model="sub.backgroundStyle.borderWidth" />
          </el-form-item>
        </template>
        <template v-if="sub.data">
          <el-divider />
          <el-form-item v-for="(item, index) in sub.data">
            <div v-if="sub.data[index].itemStyle">
              <span>第{{ index + 1 }}个柱子颜色</span>
              <el-color-picker v-model="sub.data[index].itemStyle.color" />
            </div>
          </el-form-item>
        </template>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const globalStore = useGlobalStore();
</script>
<style lang="less" scoped></style>
