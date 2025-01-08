// utils/global.ts
import * as echarts from "echarts";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { Config, Ins } from "./types";

export const useGlobalStore = defineStore("global", {
  state: () => reactive({ ins_id: "" as string, config: {} as Config, option: {} as echarts.EChartsOption, current_ins: {} as Ins }),
  actions: {
    setConfig(nv: Config): void {
      this.config = { ...nv };
    },
    setOption(nv: any): void {
      this.option = { ...nv };
    },

    setCurrentIns(nv: Ins): void {
      this.current_ins = { ...nv };
    },
  },
  getters: {},
});
