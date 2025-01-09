<template>
  <div class="welcome-page">
    <div v-for="(item, i) in menu.chart_menu_configs()" :key="i" class="menu-title">
      <div class="menu-label">
        {{ item.name }}
      </div>
      <a :href="sub_item.url" v-for="(sub_item, j) in item.values" :key="j">
        {{ sub_item.label }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { menu } from "@/utils/menu";
const router = useRouter();
const changeUrl = (path) => {
  console.log("图表跳转", path);
  router.push(path);
};
</script>
<style lang="less" scoped>
.welcome-page {
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
