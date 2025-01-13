<template>
  <div class="field-container" @dragstart="handleDragStart" @dragover="(event) => event.preventDefault()" @drop="handleDrop">
    <div class="field-wrapper" draggable="true" v-for="(item, i) in newFieldList" :key="i">
      <span class="delete-span" @click="handleDeleteClick"><i class="iconfont icon-shanchu1"></i></span>
      <span>{{ item.aggr + "(" + item.name + ")" }}</span>
      <span class="delete-span" v-show="showAggrFieldIcon" @click="handleAggregateClick"><i class="iconfont icon-sangedian"></i></span>
      <div style="width: 12px" v-show="!showAggrFieldIcon"></div>
      <vxe-modal v-model="showAggrFieldPanel" @confirm="handleAggrField" @cancel="showAggrFieldPanel = false" resize destroy-on-close show-footer show-confirm-button show-cancel-button width="30vw" height="30vh" title="聚合方式" :confirm-closable="false">
        <div>聚合方式</div>
        <el-radio-group v-model="item.aggr">
          <el-radio :value="ff.value" v-for="(ff, i) in utils.aggrFields.value" :key="i">{{ ff.label }}</el-radio>
        </el-radio-group>
        <div>排序方式</div>
        <el-radio-group v-model="item.sort">
          <el-radio :value="ff.value" v-for="(ff, i) in utils.sortFields.value" :key="i">{{ ff.label }}</el-radio>
        </el-radio-group>
      </vxe-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import { utils } from "@/utils/utils";
import { Field } from "@/utils/types";
const innerDragging = ref(false);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  fieldList: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const globalStore = useGlobalStore();
const newFieldList = ref<Field[]>([]);
const SetFieldItemValues: CallableFunction = inject("SetFieldItemValues");
const showAggrFieldIcon = ref(false);
const showAggrFieldPanel = ref(false);
onMounted(() => {
  // 如果有ins，则从ins中获取数据
  if (props.name === "xAxis") {
    showAggrFieldIcon.value = false;
    newFieldList.value = globalStore.config.xCols;
  } else if (props.name === "yAxis") {
    showAggrFieldIcon.value = true;
    newFieldList.value = globalStore.config.yCols;
  }
});

// 切换数据集时，监听props.fieldList变化，清空newFieldList
watch(
  () => props.fieldList,
  (newVal) => {
    newFieldList.value.length = 0;
  },
  { deep: true }
);
watch(
  () => newFieldList,
  (newVal) => {
    console.log("子组件列表变化", props.name, newFieldList.value);
    SetFieldItemValues(props.name, newFieldList.value);
  },
  { deep: true }
);

const handleAggrField = () => {
  console.log("聚合方式", newFieldList.value);
};
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
      const field = ref<Field>({ name: props.fieldList[Number(i)], aggr: "", sort: "" });
      newFieldList.value.push(field.value);
    }
  }
  innerDragging.value = false;
};
const handleDeleteClick = (event: MouseEvent) => {
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

const handleAggregateClick = (event: MouseEvent) => {
  event.preventDefault();

  if (event.target instanceof HTMLElement) {
    const target = event.target as HTMLElement;
    const i = target.getAttribute("i");
    console.log("聚合", props.fieldList[Number(i)]);
    showAggrFieldPanel.value = true;
  }
};
</script>

<style lang="less" scoped>
.field-container {
  border: 1px solid green;
  min-height: 30px;
  .field-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    position: relative;
    &:hover {
      background-color: #eee;
    }
    .delete-span {
      cursor: pointer;
      background-color: #eee;
      &:hover {
        background-color: #ccc;
      }
    }
  }
}
</style>
