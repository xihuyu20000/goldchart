<template>
  <div class="field-container" @dragstart="handleDragStart" @dragover="(event) => event.preventDefault()" @drop="handleDrop" @dblclick="handleDblClick">
    <div class="field-wrapper" draggable="true" v-for="(item, i) in newFieldList" :key="i">
      {{ item }}
    </div>
  </div>
</template>
<script setup lang="ts">
const innerDragging = ref(false);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  fieldList: {
    type: Array as PropType<String[]>,
    required: true,
  },
});
const globalStore = useGlobalStore();
const newFieldList = ref<String[]>([]);
const FieldItemValues: CallableFunction = inject("FieldItemValues");

onMounted(() => {
  // 如果有ins，则从ins中获取数据
  if (props.name === "xAxis") {
    newFieldList.value = globalStore.config.xCols;
  } else if (props.name === "yAxis") {
    newFieldList.value = globalStore.config.yCols;
  }
});

// 切换数据集时，监听props.fieldList变化，清空newFieldList
watch(
  () => props.fieldList,
  (newVal) => {
    newFieldList.value.length = 0;
  }
);
watch(
  () => newFieldList.value,
  (newVal) => {
    console.log("子组件列表变化", props.name, newFieldList.value);
    FieldItemValues(props.name, newFieldList.value);
  },
  { deep: true }
);

const handleDragStart = (event: DragEvent) => {
  if (event.target instanceof HTMLElement) {
    if ("field-wrapper" === event.target.getAttribute("class")) {
      innerDragging.value = true;
    }
  }
};
const handleDrop = (event: DragEvent) => {
  event.preventDefault();

  if (event.target instanceof HTMLElement) {
    const i = event.dataTransfer.getData("i");

    if (innerDragging.value) {
      const moved = newFieldList.value.splice(Number(i), 1)[0];
      newFieldList.value.push(moved);
    } else {
      newFieldList.value.push(props.fieldList[Number(i)]);
    }
  }
  innerDragging.value = false;
};
const handleDblClick = (event: MouseEvent) => {
  event.preventDefault();

  if (event.target instanceof HTMLElement) {
    const target = event.target as HTMLElement;
    const i = target.getAttribute("i");
    console.log(props.fieldList[Number(i)]);
    const index = props.fieldList.findIndex((item) => item === props.fieldList[Number(i)]);
    if (index !== -1) {
      newFieldList.value.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.field-container {
  border: 1px solid green;
  min-height: 30px;
  .field-wrapper {
    display: inline-block;
    margin: 10px;
    height: 100%;
    position: relative;
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
}
</style>
