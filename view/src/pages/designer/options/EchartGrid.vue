<!--  -->
<template>
  <div>
    <el-form style="max-width: 600px">
      <div v-for="(grid, i) in globalStore.option.grid" :key="i">
        <template v-if="globalStore.option.grid.length > 1">
          <h5>第{{ i + 1 }}个</h5>
          <hr />
        </template>
        <el-form-item label="网格">
          <el-switch v-model="grid.show" />
        </el-form-item>
        <el-form-item label="尺寸">
          <div class="position-container">宽度<el-input v-model="grid.width" /></div>
          <div class="position-container">高度<el-input v-model="grid.height" /></div>
        </el-form-item>
        <el-form-item label="位置">
          <div class="position-container">
            水平
            <el-input v-model="grid.left"></el-input>
          </div>
          <div class="position-container">
            垂直
            <el-input v-model="grid.top"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="背景色">
          <el-color-picker v-model="grid.backgroundColor" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { utils } from "@/utils/utils";
const globalStore = useGlobalStore();
</script>
<style lang="less" scoped></style>
