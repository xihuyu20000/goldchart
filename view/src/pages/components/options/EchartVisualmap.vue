<!--  -->
<template>
  <div>
    <el-form style="max-width: 600px">
      <div v-for="(sub, i) in form.visualMap" :key="i">
        <template v-if="form.visualMap.length > 1">
          <h5>第{{ i + 1 }}个</h5>
          <hr />
        </template>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import * as utils from "@/utils/utils.js";

const globalStore = useGlobalStore();

const props = defineProps({
  chartid: {
    type: String,
    required: true,
  },
  dataSource: {
    type: Object,
    default: {},
    required: true,
  },
});

const form = reactive({
  visualMap: [],
});

watch(
  form,
  (newVal, oldVal) => {
    globalStore.setOption(newVal);
  },
  { deep: true }
);
onMounted(() => {
  Object.assign(form.visualMap, props.dataSource.value.visualMap);
});
</script>
<style lang="less" scoped></style>
