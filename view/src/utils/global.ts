// utils/global.js
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ config: {}, option: {} }),
  actions: {
    setOption(nv) {
      this.option = { ...nv };
    },
    setConfig(nv) {
      this.config = { ...this.config, ...nv };
    },
  },
  getters: {},
});
