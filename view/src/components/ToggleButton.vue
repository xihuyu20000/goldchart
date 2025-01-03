<script setup>
import $ from "jquery";

const tg = ref(null);
const key = "toggle-width";

const props = defineProps({
  min: {
    type: Number,
    default: 20,
    required: true,
  },
  max: {
    type: Number,
    default: 500,
    required: true,
  },
});

onMounted(() => {
  const curr_width = localStorage.getItem(key.value);
  if (curr_width == props.min) {
    $(tg.value)
      .children()
      .first()
      .removeClass("icon-xiangzuojiantou")
      .addClass("icon-xiangyoujiantou");
  } else {
    $(tg.value)
      .children()
      .first()
      .removeClass("icon-xiangyoujiantou")
      .addClass("icon-xiangzuojiantou");
  }
  $(tg.value).parent().width(curr_width);
});
const toggle = (e) => {
  let curr = $(tg.value).parent().width();

  if (curr > props.min) {
    $(tg.value).parent().animate({ width: props.min }, 400);
    $(tg.value)
      .children()
      .first()
      .removeClass("icon-xiangzuojiantou")
      .addClass("icon-xiangyoujiantou");
  } else {
    $(tg.value).parent().animate({ width: props.max }, 400);
    $(tg.value)
      .children()
      .first()
      .removeClass("icon-xiangyoujiantou")
      .addClass("icon-xiangzuojiantou");
  }
  localStorage.setItem(key.value, curr == 20 ? props.max : props.min);
};
</script>
<template>
  <div class="chart-anchor" ref="tg" @click="toggle($event)">
    <i class="iconfont icon-xiangzuojiantou"></i>
  </div>
</template>

<style lang="less" scoped>
.chart-anchor {
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
  background-color: rgb(88, 88, 88);
  border-radius: 20%;
  color: #fff;
}
</style>
