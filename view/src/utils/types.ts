import * as echarts from "echarts";
class IChart {
  get_option(): echarts.EChartsOption {
    return null;
  }
  protect(): boolean {
    return null;
  }
}

type Config = {
  user_id: string;
  ins_id: string;
  chart_id: string;
  dataset_id: string;
  title: string; // 标题
  xCols?: string[]; // 选中的x轴，应用于echart
  yCols?: string[]; // 选中的y轴，应用于echart
  columns: string[]; // 列名
  datas?: any[]; // 数据集
};

type Ins = {
  id: string;
  user_id: string;
  config: Config;
  option: echarts.EChartsOption;
};

export { IChart, Config, Ins };
