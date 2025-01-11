<template>
  <el-card style="width: 50%">
    <template #header>
      <div class="card-header">
        <el-button text link size="default" type="primary" @click="handleCopy">复制</el-button>
      </div>
    </template>
    <Codemirror ref="SqlEditor" v-model="command" @ready="handleReady" :style="{ height: height + 'px' }" :extensions="extensions" />
  </el-card>
</template>

<script lang="ts">
import useClipboard from "vue-clipboard3";
import { Codemirror } from "vue-codemirror";
import { sql } from "@codemirror/lang-sql";

import { defineComponent, ref, onMounted, shallowRef } from "vue";

export default defineComponent({
  name: "SqlEditor",
  props: {
    command: {
      type: String,
      required: false,
      default: "",
    },

    height: {
      type: Number,
      required: false,
      default: 360,
    },
  },
  components: { Codemirror },
  setup(props) {
    // 接收 props 作为参数
    const readOnly = ref(false);
    const extensions = ref([sql()]);
    const { toClipboard } = useClipboard();

    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
      console.log(view.value);
    };

    const getCodemirrorStates = () => {
      const state = view.value.state;
      const ranges = state.selection.ranges;
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
      const cursor = ranges[0].anchor;
      const length = state.doc.length;
      const lines = state.doc.lines;
      const content = state.doc.toString();

      // 你还可以返回或者进一步处理获取到的状态
      return {
        selected,
        cursor,
        length,
        lines,
        content,
      };
    };

    const handleCopy = async () => {
      try {
        const content = getCodemirrorStates().content || "";
        await toClipboard(content);
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      // 挂载后执行的逻辑
    });

    return {
      command: props.command, // 使用 props.command
      height: props.height,
      readOnly,
      extensions,
      handleReady,
      handleCopy,
    };
  },
});
</script>
