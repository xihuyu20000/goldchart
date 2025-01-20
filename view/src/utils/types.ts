import * as echarts from "echarts";
class IChart {
  get_option(): echarts.EChartsOption {
    return null;
  }

  can_run(): Promise<boolean> {
    if (this.check_config()) {
      return this.wrap_option();
    } else {
      return Promise.resolve(false);
    }
  }
  check_config(): Promise<boolean> {
    return null;
  }
  wrap_option(): Promise<boolean> {
    return null;
  }
}
/**
 *  配置字段
 */
class ConfigField {
  name: string;
  aggr?: string;
  sort?: string;
  constructor(name: string, aggr: string = "sum", sort: string = "") {
    this.name = name;
    this.aggr = aggr;
    this.sort = sort;
  }
}
/**
 *  数据集
 */
class Dataset {
  id: string;
  connect_id: string;
  sql: string;
  name: string;
  columns: string[];
}
/**
 * 自定义配置
 */
class Config {
  user_id: string = "";
  ins_id: string = "";
  chart_id: string = "";
  dataset_id: string = "";
  title: string = ""; // 标题
  xCols?: ConfigField[] = []; // 选中的x轴，应用于echart
  yCols?: ConfigField[] = []; // 选中的y轴，应用于echart
  columns: string[] = []; // 列名
}
class Chart {
  columns: string[] = [];
  datas: any[] = [];
}
/**
 * 图表校验规则
 */
type ChartRule = {
  name: string;
  range: [number, number];
};
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

export { IChart, ConfigField, Dataset, Config, Chart, ChartRule, Ins, ResponseState };
