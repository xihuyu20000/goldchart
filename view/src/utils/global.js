// stores/global.js
import { set } from "@vueuse/core";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ option: {}, activeDatafile: "" }),
  actions: {
    setOption(config) {
      config["draggable"] = true;
      this.option = { ...this.option, ...config };
    },
    setActiveDatafile(datafile_id) {
      this.activeDatafile = datafile_id;
    },
  },
  getters: {},
});
