import { defineConfig, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "pinia",
        {
          "vue-router": ["useRouter", "useRoute"],
          "@/utils/bus.js": ["emitter"],
          "@/utils/global.js": ["useGlobalStore"],
          "@/utils/http.js": ["$post", "$upload", "$chart"],
          "@/utils/logger.js": ["logger"],
          "@/utils/optionfactory.js": ["get_options"],
          "@/utils/options.js": ["MyBaseOption"],
        },
      ],
      dirs: [
        // {
        //   // 自动导入 src/utils 目录下所有以 `.js` 结尾的文件
        //   path: "src/utils",
        //   // 可以指定文件后缀
        //   extensions: [".js"],
        //   // 可以指定是否递归子目录
        //   recursive: true,
        //   // 可以指定排除的文件名或模式
        //   exclude: ["**/index.js", "**/*.spec.js"],
        // },
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/pages"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // 获取请求中带 /api 的请求
        target: "http://localhost:5000", // 后台服务器的源
        changeOrigin: true, // 修改源
        rewrite: (path) => path.replace(/^\/api/, ""), //  /api 替换为空字符串
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: "all",
    });
  },
  build: {
    chunkSizeWarningLimit: 150000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
