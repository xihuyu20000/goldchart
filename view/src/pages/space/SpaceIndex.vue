<script setup lang="ts">
import { menu } from "@/utils/menu";
import { useRouter } from "vue-router";
const router = useRouter();

const activeUrl = ref("");

onMounted(async () => {
  activeUrl.value = await utils.getLocalItem("activeUrl");
});
const clickMenuUrl = (url) => {
  activeUrl.value = url;
  utils.setLocalItem({
    activeUrl: activeUrl.value,
  });
};
</script>
<template>
  <el-container class="space-index-page">
    <el-aside class="space-index-aside">
      <ol>
        <li v-for="(item, j) in menu.space_menu_configs_array()" :key="j" :class="{ 'active-url': activeUrl == item.url }" @click="clickMenuUrl(item.url)">
          <span :class="`icon iconfont ${item.icon}`" style="margin-right: 10px"></span><router-link :to="item.url">{{ item.label }}</router-link>
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
  background-color: #f6f7f8;
  .space-index-aside {
    width: var(--left_nav_width);
    height: calc(100vh - 60px);
    background-color: #fff;
    padding-top: 10px;
    ol {
      list-style: none;
      li {
        height: 3em;
        line-height: 3em;
        padding-left: 10px;

        a {
          display: inline-block;
          font-size: 1.2em !important;
          text-decoration: none;
          color: rgba(1, 1, 1, 0.8);
        }
      }
    }
    li:hover {
      background-color: #f3f5f9;
      cursor: pointer;
    }
  }
  .active-url {
    background-color: #f3f5f9;
  }
}
</style>
