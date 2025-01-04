import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { chart_menu_configs } from "@/utils/menu.js";
import { path } from "d3";
import { component } from "vxe-table";
const dynamicSpaceRoutes = () => {
  /**
   * 我的空间路由
   */
  let modules = import.meta.glob(`@/pages/space/*.vue`);
  // 2-1 合并菜单配置
  const combinedArray = Object.values(chart_menu_configs)
    .filter((val) => Array.isArray(val))
    .reduce((acc, val) => acc.concat(val), []);
  // 2-2 动态路由，筛选style==='space'
  const spaceRoutes = combinedArray
    .filter((val) => val.style === "space")
    .map((item) => ({
      name: item.url,
      path: item.url,
      component: modules[`/src/pages${item.url}.vue`],
      meta: {
        title: item.label,
        chartid: item.url,
      },
    }));
  return spaceRoutes;
};
const dynamicChartRoutes = () => {
  /**
   * 动态图表路由
   */

  // 2-1 合并菜单配置
  const combinedArray = Object.values(chart_menu_configs)
    .filter((val) => Array.isArray(val))
    .reduce((acc, val) => acc.concat(val), []);
  // 2-2 动态路由，筛选style==='chart'
  const chartRoutes = combinedArray
    .filter((val) => val.style === "chart")
    .map((item) => ({
      name: item.url,
      path: item.url,
      component: () => import("@/charts/Chart.vue"),
      meta: {
        title: item.label,
        chartid: item.url,
      },
    }));
  return chartRoutes;
};
const routes = [
  { path: "/", name: "/", redirect: "/Home" },
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    children: [
      {
        path: "/Space",
        name: "Space",
        component: () => import("@/pages/Space/SpaceIndex.vue"),
        children: dynamicSpaceRoutes(),
      },
      {
        path: "", // 首页，必须是空路径
        name: "Default",
        component: () => import("@/pages/Welcome.vue"),
        children: [
          {
            path: "/Welcome", // 首页，必须是空路径
            name: "Welcome",
            component: () => import("@/pages/Welcome.vue"),
          },
        ],
      },
    ],
  },
  ...dynamicChartRoutes(),
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whitelist = ["/Login"];
router.beforeEach((to, from, next) => {
  logger.debug(`[路由] 从${from.path}  到${to.path}`);
  // 3-1 白名单，放行
  if (whitelist.includes(to.path)) {
    next();
    return;
  }
  // 3-2 判断是否登录
  let token = sessionStorage.getItem("token");
  if (token) {
    fetch("/api/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, ffrom: from.path, tto: to.path }),
    });

    next();
    return;
  }
  logger.warn("未登录，跳转登录页");
  // 3-3 未登录，跳转登录页
  next("/Login");
});

export default router;
