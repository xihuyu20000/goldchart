import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicFunnelChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      columns: [],
      title: [
        {
          show: true,
          text: "漏斗图",
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
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}%",
      },

      legend: {
        textStyle: {},
        data: ["Show", "Click", "Visit", "Inquiry", "Order"],
      },
      series: [
        {
          name: "Funnel",
          type: "funnel",
          left: "10%",
          top: 60,
          bottom: 60,
          width: "80%",
          min: 0,
          max: 100,
          minSize: "0%",
          maxSize: "100%",
          sort: "descending",
          gap: 2,
          label: {
            show: true,
            position: "inside",
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: "solid",
            },
          },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: [
            { value: 60, name: "Visit" },
            { value: 40, name: "Inquiry" },
            { value: 20, name: "Order" },
            { value: 80, name: "Click" },
            { value: 100, name: "Show" },
          ],
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
