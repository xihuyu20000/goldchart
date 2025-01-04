// utils/global.js
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ activeLeftNav: "", option: {} }),
  actions: {
    setLeftNavActive(name) {
      this.activeLeftNav = name;
      sessionStorage.setItem("activeLeftNav", JSON.stringify(name));
    },
    setOption(config) {
      config["draggable"] = true;
      this.option = { ...this.option, ...config };
    },
  },
  getters: {
    getLeftNavActive: (state) => {
      const activeLeftNav = sessionStorage.getItem("activeLeftNav");
      if (activeLeftNav) {
        return JSON.parse(activeLeftNav);
      }
      return "";
    },
  },
});
