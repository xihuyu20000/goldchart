import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicLineChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: true,
          text: "基础线性图",
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
        },
      ],
    };
    return option;
  }

  protect(): boolean {
    console.warn("guard", toRaw(globalStore.config));
    // 1 根据xCols对xAxis赋值
    let is_xAxis_data: boolean = false;
    if ("xCols" in globalStore.config && globalStore.config.xCols.length > 0) {
      globalStore.option.xAxis = [];
      for (const xCol of globalStore.config.xCols) {
        const index = globalStore.config.columns.findIndex((item) => item === xCol);
        const data = globalStore.config.datas.map((item) => item[index]);
        console.log("x轴", `索引 ${index}`, `数据 ${data}`);
        const obj: echarts.XAXisComponentOption = {
          show: true,
          type: "category",
          name: xCol,
          nameLocation: "middle",
          nameGap: 35,
          axisLabel: { show: true },
          nameTextStyle: { fontSize: 20 },
          data: Array.isArray(data) ? data : [data],
        };
        if (obj.data.length > 0) {
          is_xAxis_data = true;
        }
        globalStore.option.xAxis.push(obj);
      }
    }

    // 2 根据yCols对series赋值
    let is_series_data = false;
    if ("yCols" in globalStore.config && globalStore.config.yCols.length > 0) {
      globalStore.option.series = [];
      for (const yCol of globalStore.config.yCols) {
        const index = globalStore.config.columns.findIndex((item) => item === yCol);
        const data = globalStore.config.datas.map((item) => item[index]);
        console.log("系列", `索引 ${index}`, `数据 ${data}`);
        const obj: echarts.LineSeriesOption = {
          data: Array.isArray(data) ? data : [data],
          type: "line",
          name: yCol,
          lineStyle: {},
          label: { show: true, fontSize: 12 },
          showSymbol: true,
          symbolSize: 8,
        };
        if (obj.data.length > 0) {
          is_series_data = true;
        }
        globalStore.option.series.push(obj);
      }
    }
    console.warn("guard", is_xAxis_data, is_series_data);
    if (is_xAxis_data && is_series_data) {
      console.warn("guard", "数据完整", toRaw(globalStore.option));
      return true;
    }
    return false;
  }
}
