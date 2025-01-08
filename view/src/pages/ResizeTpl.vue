<script setup lang="ts">
import { onMounted } from "vue";
function getEle(id) {
  return document.getElementById(id);
}
onMounted(() => {
  let left = getEle("left");
  let right = getEle("right");
  let middle = getEle("middle");

  let middleWidth = 5;
  middle.onmousedown = function (e) {
    var disX = (e || event).clientX;
    middle.left = middle.offsetLeft;
    document.onmousemove = function (e) {
      let middleLeft = middle.left + ((e || event).clientX - disX);
      let maxWidth = document.body.clientWidth;
      middleLeft < 0 && (middleLeft = 0);
      middleLeft > maxWidth && (middleLeft = maxWidth);
      middle.style.left = left.style.width = middleLeft + "px";
      right.style.width = maxWidth - middleLeft - middleWidth + "px";
      right.style.left = middleLeft + middleWidth + "px";
      return false;
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      middle.releaseCapture && middle.releaseCapture();
    };
    middle.setCapture && middle.setCapture();
    return false;
  };
});
</script>
<template>
  <div class="resize-tpl">
    <div id="left"><slot name="leftView" /></div>
    <div id="middle"></div>
    <div id="right"><slot name="rightView" /></div>
  </div>
</template>

<style lang="less" scoped>
.resize-tpl {
  width: 100wh;
  height: 100vh;
  display: flex;
}

#left,
#right,
#middle {
  height: 100vh;
  position: absolute;
}

#left {
  left: var(--left_nav_width);
  padding-right: var(--left_nav_width);
  width: var(--project_home_width);
  background: var(--public_theme_dark_color);
}

#middle {
  width: 5px;
  background: #666;
  left: var(--project_home_width);
}

#middle:hover {
  cursor: col-resize;
}

#right {
  right: 0;
  background: var(--public_theme_dark_color);
  left: calc(var(--project_home_width) + 5px);
  width: auto;
}
</style>
