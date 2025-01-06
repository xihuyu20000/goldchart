// utils/global.js
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ config: {}, option: {} }),
  actions: {
    setOption(nv) {
      this.option = { ...this.option, ...nv };
    },
    setConfig(nv) {
      this.config = { ...this.config, ...nv };
    },
  },
  getters: {},
});
