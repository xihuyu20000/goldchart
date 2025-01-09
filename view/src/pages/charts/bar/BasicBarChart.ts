import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicBarChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: true,
          text: "基本柱状图",
          top: "2%",
          left: "50%",
          textAlign: "center",
          textVerticalAlign: "middle",
          textStyle: {
            color: "#000",
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
      legend: {
        show: false,
        textStyle: { fontSize: 18 },
        itemStyle: {},
        lineStyle: {},
      },

      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          label: { show: true, fontSize: 12, position: "top" },
        },
      ],
    };

    return option;
  }
  protect(): boolean {
    console.warn("protect", toRaw(globalStore.config));
    return true;
  }
}
