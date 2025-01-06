<!-- EchartGraphics.vue -->
<template>
  <div>图元配置</div>
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
  graphics: {},
});
computed: {
}
watch(
  form,
  (newVal, oldVal) => {
    globalStore.setOption(newVal);
  },
  { deep: true }
);
onMounted(() => {
  Object.assign(form.graphics, props.dataSource.value.graphics);
});
</script>
<style lang="less" scoped></style>
