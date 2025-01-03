import { createApp } from "vue";
import "./global.less";
import App from "./App.vue";
const app = createApp(App);
app.config.warnHandler = () => null; // 关闭所有警告

// 1 路由
import router from "@/router/index.js";
app.use(router);

// 2 存储
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

// 3 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus, { zIndex: 3000, size: "mini" });
console.log("element-plus版本号：", ElementPlus.version);

// 4 echarts
import * as echarts from "echarts/core";
app.config.globalProperties.$echarts = echarts; // 全局挂载echarts
console.log("echarts版本号：", echarts.version);

// 5 阿里图标
import "@/assets/iconfont/iconfont.css";

// 6 vxe-table
import "vxe-pc-ui/lib/style.css";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
app.use(VxeUITable);

app.mount("#app");
