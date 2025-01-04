<template>
  <el-container class="default-page">
    <el-aside class="default-aside">
      <el-collapse accordion v-model="activeMenu">
        <el-collapse-item
          :title="name"
          :name="name"
          v-for="(value, name, i) in chart_menu_configs"
          :key="i"
        >
          <ol type="d" start="1">
            <li
              v-for="(item, j) in value"
              :key="j"
              :class="{ 'active-url': activeUrl == item.url }"
            >
              <router-link
                :to="item.url"
                @click="clickMenuUrl(name, item.url)"
                >{{ item.label }}</router-link
              >
            </li>
          </ol>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-main id="default-main"><router-view :key="$route.fullPath" /></el-main>
  </el-container>
</template>
<script setup>
import * as utils from "@/utils/utils";
import { chart_menu_configs } from "@/utils/menu";
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

const handleLogout = async () => {
  const resp = await $post("/api/logout", {
    token: sessionStorage.getItem(utils.StorageKeys.token),
  });
  if (resp.code === 200) {
    sessionStorage.clear();
    router.push("/Login");
  } else {
    ElMessage({
      type: "error",
      message: "登录失败",
    });
  }
};
onMounted(() => {
  // 还原菜单项和url

  activeMenu.value = utils.getLocalItem("activeMenu");
  activeUrl.value = utils.getLocalItem("activeUrl");
  const router = useRouter();
  router.push(activeUrl.value);
});
</script>
<style lang="less" scoped>
.active-url {
  display: block;
  background-image: linear-gradient(to right, #8082e4, #15c5cb);
  border-radius: 7px;
}

.default-page {
  width: 100%;
  height: calc(100vh - 60px);
  .default-aside {
    width: var(--left_nav_width);
    height: calc(100vh - 60px);

    :deep(.el-collapse-item__header) {
      height: 30px;
      border: 0;
      background-color: rgba(49, 65, 88, 0.9);
      color: #fff;
      font-size: 12px;
      padding-left: 5px;
    }
    :deep(.el-collapse-item__content) {
      padding-bottom: 0;
      background-color: rgba(130, 140, 160, 1);

      ol {
        list-style: none;
        padding: 0;
        li {
          height: 2em;
          line-height: 2em;
          padding-left: 10px;

          a {
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
}

#default-main {
  height: calc(100vh - 60px);
  margin: 0;
  padding: 0;
}
</style>
