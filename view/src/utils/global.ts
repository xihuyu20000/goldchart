// utils/global.ts
import * as echarts from "echarts";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { Config, Chart, Dataset, Ins } from "./types";
import { set } from "@vueuse/core";

type GlobalState = {
  ins_id: string;
  config: Config;
  chart: Chart;

  option: echarts.EChartsOption;
  datasetList: Dataset[];
};

export const useGlobalStore = defineStore("global", {
  // 必须有默认值，不能使用undefined、null等
  state: () => reactive<GlobalState>({ ins_id: "" as string, config: new Config(), chart: new Chart(), option: {} as echarts.EChartsOption, datasetList: [] }),
  actions: {
    setConfig(nv: Config): void {
      this.config = Object.assign(this.config, nv);
    },
    setChartColumns(cols: string[]): void {
      this.chart.columns = ref(cols);
    },
    setChartDatas(datas: any[]): void {
      this.chart.datas = ref(datas);
    },
    setOption(option: echarts.EChartsOption): void {
      this.option = { ...option };
    },

    // 在我的空间——>实例列表，调用该方法，将当前实例信息保存到全局状态中
    setCurrentIns(ins: Ins): void {
      this.ins_id = ins.id;
      this.setConfig(ins.config);
      this.setOption(ins.option);
    },
  },
  getters: {
    get_newsql: (state): string => {
      const dataset = state.datasetList.find((item) => item.id === state.config.dataset_id);
      const groups = state.config.xCols.map((xCol) => xCol.name).join(",");
      const selects = state.config.yCols.map((yCol) => yCol.aggr + "(" + yCol.name + ")" + " AS " + yCol.name).join(",");
      const sorts = state.config.yCols.map((yCol) => yCol.name + " " + yCol.sort).join(",");
      const newsql = `SELECT ${groups}, ${selects} FROM (${dataset.sql}) AS t1 GROUP BY ${groups} ORDER BY ${sorts}`;
      return newsql;
    },
    get_current_dataset: (state): Dataset | undefined => state.datasetList.find((item) => item.id === state.config.dataset_id),
  },
});
