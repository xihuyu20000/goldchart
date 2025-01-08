<script setup lang="ts">
import { menu } from "@/utils/menu";
import { useRouter } from "vue-router";
const router = useRouter();
const activeMenu = ref("");
const activeUrl = ref("");

const clickMenuUrl = (name, url) => {
  //点击菜单项时，更新当前激活的菜单项和url
  activeMenu.value = name;
  activeUrl.value = url;
  utils.setLocalItem({
    activeMenu: activeMenu.value,
    activeUrl: activeUrl.value,
  });
};
</script>
<template>
  <el-container class="space-index-page">
    <el-aside class="space-index-aside">
      <ol>
        <li v-for="(item, j) in menu.space_menu_configs()" :key="j" :class="{ 'active-url': activeUrl == item.url }">
          <router-link :to="item.url">{{ item.label }}</router-link>
        </li>
      </ol>
    </el-aside>
    <el-main><router-view :key="$route.fullPath" /></el-main>
  </el-container>
</template>

<style lang="less" scoped>
.space-index-page {
  width: 100%;
  height: 100vh;

  .space-index-aside {
    width: var(--left_nav_width);
    height: calc(100vh - 60px);
    background-color: rgba(120, 120, 120, 0.8);
    ol {
      list-style: none;
      li {
        height: 3em;
        line-height: 3em;
        padding-left: 10px;

        a {
          font-size: 1.2em !important;
          text-decoration: none;
          color: rgba(250, 250, 250, 0.8);
        }
        a:hover {
          background-color: dodgerblue;
        }
      }
    }
  }
}
</style>
