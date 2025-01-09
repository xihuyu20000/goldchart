import { toRaw } from "vue";
import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class StackedLineChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: false,
          text: "堆叠折线图",
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
        show: true,
        itemGap: 10,
        textStyle: { fontSize: 18 },
        itemStyle: {},
        lineStyle: {},
      },

      xAxis: [
        {
          axisLabel: { show: true, fontSize: 12 },
          nameTextStyle: { fontSize: 12 },
          name: "日期",
          nameLocation: "middle",
          nameGap: 40,
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          axisLabel: { show: true, fontSize: 12 },
          nameTextStyle: { fontSize: 12 },
          name: "数量",
          nameLocation: "middle",
          nameGap: 40,
          type: "value",
        },
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          label: { show: true, fontSize: 12 },
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
