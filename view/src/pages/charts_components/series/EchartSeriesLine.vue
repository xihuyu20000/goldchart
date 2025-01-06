<!--  -->
<template>
  <el-form style="max-width: 600px">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item :name="i" v-for="(sub, i) in globalStore.option.series">
        <template #title>
          <h5>{{ globalStore.option.series[i].name }}</h5>
        </template>
        <el-form-item label="渐变色" v-if="sub.gradientColor">
          <el-select v-model="sub.gradientColor">
            <el-option v-for="(item, index) in utils.echartOptionGradientColor" :key="index" :label="item.label" :value="item.value">
              <div :style="`background-image: linear-gradient(to right, ${item.value})`">
                {{ item.label }}
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示数值" v-if="sub.label">
          <el-switch v-model="sub.label.show" />
        </el-form-item>
        <el-form-item label="数值颜色" v-if="sub.label">
          <el-color-picker v-model="sub.label.color" />
        </el-form-item>
        <el-form-item label="数值字号" v-if="sub.label">
          <el-slider v-model="sub.label.fontSize" />
        </el-form-item>
        <el-form-item label="数值格式化" v-if="sub.label">
          <el-tooltip raw-content content="<p>模板变量有:</p><p>{a}：系列名。</p><p>{b}：数据名。</p><p>{c}：数据值。</p><p>{@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。</p><p>{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。</p>" placement="right">
            <el-input v-model="sub.label.formatter" />
          </el-tooltip>
        </el-form-item>
        <el-divider />
        <el-form-item label="显示标记">
          <el-switch v-model="sub.showSymbol" />
        </el-form-item>
        <el-form-item label="标记形状">
          <el-select v-model="sub.symbol">
            <el-option v-for="item in utils.seriesSymbols" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="标记大小">
          <el-slider v-model="sub.symbolSize" />
        </el-form-item>
        <el-divider />
        <el-form-item label="线条颜色" v-if="sub.lineStyle">
          <el-color-picker v-model="sub.lineStyle.color" />
        </el-form-item>
        <el-form-item label="线条宽度" v-if="sub.lineStyle">
          <el-slider v-model="sub.lineStyle.width" />
        </el-form-item>
        <el-form-item label="线条样式" v-if="sub.lineStyle">
          <el-select v-model="sub.lineStyle.type">
            <el-option v-for="item in utils.seriesLineStyleTypes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-divider />
        <el-form-item label="线条平滑">
          <el-switch v-model="sub.smooth" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script setup>
import * as echarts from "echarts";
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();

// watch(
//   () => globalStore.option,
//   (newVal, oldVal) => {
//     globalStore.setOption(newVal);
//     console.log("newVal", newVal);
//   },
//   { deep: true }
// );
</script>
<style lang="less" scoped></style>
