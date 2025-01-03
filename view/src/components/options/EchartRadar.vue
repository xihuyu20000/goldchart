<!--  -->
<template>
  <div>
    <el-form style="max-width: 600px">
      <div v-for="(sub, i) in form.radar" :key="i">
        <template v-if="form.radar.length > 1">
          <h5>第{{ i + 1 }}个</h5>
          <hr />
        </template>
        雷达图
      </div>
    </el-form>
  </div>
</template>

<script setup>
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
  radar: [],
});
watch(
  form,
  (newVal, oldVal) => {
    globalStore.setOption(newVal);
  },
  { deep: true }
);
onMounted(() => {
  Object.assign(form.radar, props.dataSource.value.radar);
});
</script>
<style lang="less" scoped></style>
