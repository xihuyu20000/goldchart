// utils/global.ts
import { defineStore } from "pinia";
import { reactive } from "vue";

interface ConfigState {
  datafileId: string;
  xCols: string[];
  yCols: string[];
}

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ config: {} as ConfigState, option: {} }),
  actions: {
    setOption(nv: any): void {
      this.option = { ...nv };
    },
    setConfig(nv: ConfigState): void {
      this.config = { ...nv };
    },
  },
  getters: {},
});
