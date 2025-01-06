<script setup>
import { chart_menu_configs } from "@/utils/menu.ts";
import { useRouter } from "vue-router";
const router = useRouter();
const changeUrl = (path) => {
  console.log("图表跳转", path);
  // router.push(path);
  window.open(path, "_blank");
};
</script>
<template>
  <div class="welcome">
    <div
      v-for="(value, name, i) in chart_menu_configs"
      :key="i"
      class="menu-title"
    >
      <div class="menu-label">
        {{ name }}
      </div>
      <a
        href="#"
        v-for="(item, j) in value"
        :key="j"
        @click="() => changeUrl(item.url)"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.welcome {
  width: 100%;
  height: 100%;
  padding: 20px;
  .menu-title {
    .menu-label {
      font-size: 2em !important;
      margin: 20px 0;
    }
    a {
      display: inline-block;
      text-decoration: none;
      margin: 10px;
      font-size: 1.5em !important;
    }
  }
}
</style>
