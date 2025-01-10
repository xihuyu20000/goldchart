<template>
  <div class="field-container" @dragstart="handleDragStart" @dragover="(event) => event.preventDefault()" @drop="handleDrop" @dblclick="handleDblClick">
    <div class="field-wrapper" draggable="true" v-for="(item, i) in newFieldList" :key="i">
      {{ item.label }}
    </div>
  </div>
</template>
<script setup lang="ts">
const innerDragging = ref(false);
type FieldItem = { label: string; value: any };
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  fieldList: {
    type: Array as PropType<FieldItem[]>,
    required: true,
  },
});
const newFieldList = ref<FieldItem[]>([]);
const FieldItemValues: CallableFunction = inject("FieldItemValues");
// 切换数据集时，监听props.fieldList变化，清空newFieldList
watch(
  () => props.fieldList,
  (newVal) => {
    newFieldList.value.length = 0;
  }
);
watch(
  () => newFieldList,
  (newVal) => {
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
    const index = props.fieldList.findIndex((item) => item.label === props.fieldList[Number(i)].label);
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
