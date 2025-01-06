// utils/global.ts
import { defineStore } from "pinia";
import { reactive } from "vue";

interface ConfigState {
  user_id: string;
  chart_id: string;
  ins_id: string;
  title: string;
  datafile_id: string;
  xCols: string[];
  yCols: string[];
}

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ ins_id: "" as string, config: {} as ConfigState, option: {} }),
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
