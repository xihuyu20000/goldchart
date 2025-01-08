import * as echarts from "echarts";

interface Config {
  user_id: string;
  chart_id: string;
  ins_id: string;
  title: string;
  datafile_id: string;
  xCols: string[];
  yCols: string[];
  columns: string[];
  dataset: string[] | number[];
}

interface Ins {
  id: string;
  user_id: string;
  config: Config;
  option: echarts.EChartsOption;
}
interface MenuItem {
  url: string;
  label: string;
}

export { Config, Ins, MenuItem };
