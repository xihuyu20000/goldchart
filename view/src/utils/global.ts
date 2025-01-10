// utils/global.ts
import * as echarts from "echarts";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { Config, Ins } from "./types";

type GlobalState = {
  ins_id: string;
  config: Config;
  option: echarts.EChartsOption;
};
export const useGlobalStore = defineStore("global", {
  // 必须有默认值，不能使用undefined、null等
  state: () => reactive<GlobalState>({ ins_id: "" as string, config: {} as Config, option: {} as echarts.EChartsOption }),
  actions: {
    setConfig(nv: Config): void {
      this.config = { ...nv };
    },
    setOption(nv: any): void {
      this.option = { ...nv };
    },

    // 在我的空间——>实例列表，调用该方法，将当前实例信息保存到全局状态中
    setCurrentIns(nv: Ins): void {
      this.ins_id = nv.config.ins_id;
      this.setConfig(nv.config);
      this.setOption(nv.option);
    },
  },
  getters: {},
});
