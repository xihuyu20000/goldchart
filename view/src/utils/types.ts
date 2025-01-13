import * as echarts from "echarts";
class IChart {
  get_option(): echarts.EChartsOption {
    return null;
  }
  protect(): Promise<boolean> {
    return null;
  }
}
class Field {
  name: string;
  aggr?: string;
  sort?: string;
  constructor(name: string, aggr: string = "sum", sort: string = "") {
    this.name = name;
    this.aggr = aggr;
    this.sort = sort;
  }
}
class Dataset {
  id: string;
  connect_id: string;
  sql: string;
  name: string;
}
class Config {
  user_id: string = "";
  ins_id: string = "";
  chart_id: string = "";
  dataset_id: string = "";
  title: string = ""; // 标题
  xCols?: Field[] = []; // 选中的x轴，应用于echart
  yCols?: Field[] = []; // 选中的y轴，应用于echart
  columns: string[] = []; // 列名
}
class Chart {
  columns: string[] = [];
  datas: any[] = [];
}
type Ins = {
  id: string;
  user_id: string;
  config: Config;
  option: echarts.EChartsOption;
};
type ResponseState = {
  ins_id?: string;
  columns: string[];
  chart_columns: any[];
  chart_datas: any[];
};
export { IChart, Field, Dataset, Config, Chart, Ins, ResponseState };
