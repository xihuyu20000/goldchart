import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicAreaChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: true,
          text: "基础面积图",
          top: "2%",
          left: "50%",
          textAlign: "center",
          textVerticalAlign: "middle",
          textStyle: {
            color: "#333",
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "Microsoft Yahei",
          },
        },
      ],
      grid: [
        {
          show: true,
          width: "auto",
          height: "auto",
          left: "10%",
          top: 60,
          right: "10%",
          bottom: 60,
          containLabel: true,
        },
      ],
      textStyle: { color: "#111" },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        show: false,
        textStyle: { fontSize: 18 },
        itemStyle: {},
        lineStyle: {},
      },
      xAxis: [
        {
          show: true,
          type: "category",
          name: "X轴",
          nameLocation: "middle",
          nameGap: 35,
          axisLabel: { show: true },
          nameTextStyle: { fontSize: 20 },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],

      yAxis: [
        {
          show: true,
          type: "value",
          name: "Y轴",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {},
          nameTextStyle: { fontSize: 20 },
        },
      ],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
          name: "",
          lineStyle: {},
          label: { show: true, fontSize: 12 },
          showSymbol: true,
          symbolSize: 8,
          areaStyle: {},
        },
      ],
    };
    return option;
  }

  async wrap_option(): Promise<boolean> {
    console.warn("protect", toRaw(globalStore.config));
    // 1 判断config是否完整
    if (globalStore.config.user_id.length == 0 || globalStore.config.chart_id.length == 0 || globalStore.config.xCols.length == 0 || globalStore.config.yCols.length == 0) {
      console.warn("protect", "数据集不完整", toRaw(globalStore.config));
      return false;
    }
    // 2 后端获取数据集
    const req_config = Object.assign({}, globalStore.config);
    const resp = await $post("/api/chart/getdata_by", req_config);

    globalStore.setChart(resp.chart_columns, resp.chart_datas);

    // 2.1 处理数据
    const datas = {};
    for (let i = 0; i < globalStore.chart.columns.length; i++) {
      const col = globalStore.chart.columns[i];
      datas[col] = globalStore.chart.datas.map((item) => item[i]);
    }
    // 3 根据xCols对xAxis赋值
    let is_xAxis_data: boolean = false;
    if (globalStore.chart.columns.length > 0) {
      globalStore.option.xAxis = [];

      const intersection = globalStore.config.xCols.map((item) => item.name).filter((element) => globalStore.chart.columns.includes(element));

      for (const col of intersection) {
        const obj: echarts.XAXisComponentOption = {
          show: true,
          type: "category",
          name: col,
          nameLocation: "middle",
          nameGap: 35,
          axisLabel: { show: true },
          nameTextStyle: { fontSize: 20 },
          data: datas[col],
        };
        globalStore.option.xAxis.push(obj);
      }
      if (globalStore.option.xAxis.length > 0) {
        is_xAxis_data = true;
      }
    }

    // 4 根据yCols对series赋值
    let is_series_data = false;
    if (globalStore.chart.datas.length > 0) {
      globalStore.option.series = [];

      const intersection = globalStore.config.yCols.map((item) => item.name).filter((element) => globalStore.chart.columns.includes(element));

      for (const col of intersection) {
        const obj: echarts.LineSeriesOption = {
          data: datas[col],
          type: "line",
          name: col,
          lineStyle: {},
          label: { show: true, fontSize: 12 },
          showSymbol: true,
          symbolSize: 8,
          areaStyle: {},
        };
        if (obj.data.length > 0) {
          is_series_data = true;
        }
        globalStore.option.series.push(obj);
      }
    }
    console.warn("protect", is_xAxis_data, is_series_data);
    if (is_xAxis_data && is_series_data) {
      console.warn("protect", "数据完整", toRaw(globalStore.option));
      return true;
    }
    return false;
  }
}
