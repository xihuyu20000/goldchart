<template>
  <el-container class="home-page">
    <el-header class="home-header">
      <div class="header-title">图表宝</div>
      <div class="header-nav">
        <router-link to="/Space">我的空间</router-link>
        <router-link to="/Welcome">图表导航</router-link>
      </div>
      <div class="header-profile">
        <a href="#"
          >个人中心<span>--{{ currentUser.labelname }}</span></a
        >

        <ul class="submenu">
          <li><a href="#" @click="handleLogout">退出系统</a></li>
        </ul>
      </div>
    </el-header>
    <router-view :key="$route.fullPath" />
  </el-container>
</template>
<script setup>
import * as utils from "@/utils/utils";
import { chart_menu_configs } from "@/utils/menu.ts";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const activeMenu = ref("");
const activeUrl = ref("");
const currentUser = ref({});

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
  // 2-1 还原菜单项和url

  activeMenu.value = utils.getLocalItem("activeMenu");
  activeUrl.value = utils.getLocalItem("activeUrl");
  const router = useRouter();
  router.push(activeUrl.value);
  // 2-2 获取当前用户信息
  currentUser.value = JSON.parse(sessionStorage.getItem("user"));
  console.log("登录用户", currentUser.value);
});
</script>
<style lang="less" scoped>
.active-url {
  display: block;
  background-image: linear-gradient(to right, #8082e4, #15c5cb);
  border-radius: 7px;
}

.home-page {
  width: 100%;
  height: 100vh;
}
.home-header {
  background-color: #eee;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  .header-title {
    width: 200px;
    font-weight: bolder;
    font-size: 24px !important;
  }
  .header-nav {
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
    display: flex;
    a {
      margin: 0 10px;
      color: #314158;
      text-decoration: none;
      &:hover {
        color: #8082e4;
      }
    }
  }
  .header-profile {
    width: 100px;
    .submenu {
      display: none;
      position: absolute;
      top: 60px;
      right: 0;
      width: 100px;
      background-color: #a8a7a7;

      border-radius: 5px;
      z-index: 1000;
      li {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        list-style: none;
        a {
          text-decoration: none;
          color: #314158;
        }
      }
    }
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #314158;
      font-size: 14px;
      text-decoration: none;
    }
    &:hover {
      .submenu {
        display: block;
        animation: fadeIn 0.3s ease-in-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
.home-container {
  height: calc(100vh - 60px);
  .home-aside {
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

#home-main {
  height: calc(100vh - 60px);
  margin: 0;
  padding: 0;
}
</style>
