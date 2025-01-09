import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class RoseChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: true,
          text: "玫瑰图",
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
      legend: {
        show: true,
        top: "bottom",
        textStyle: {},
      },

      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" },
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
