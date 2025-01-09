import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicSankeyChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      columns: [],
      title: [
        {
          show: true,
          text: "基础桑吉图",
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
      series: [
        {
          type: "sankey",
          emphasis: {
            focus: "adjacency",
          },
          data: [
            {
              name: "a",
            },
            {
              name: "b",
            },
            {
              name: "a1",
            },
            {
              name: "a2",
            },
            {
              name: "b1",
            },
            {
              name: "c",
            },
          ],
          links: [
            {
              source: "a",
              target: "a1",
              value: 5,
            },
            {
              source: "a",
              target: "a2",
              value: 3,
            },
            {
              source: "b",
              target: "b1",
              value: 8,
            },
            {
              source: "a",
              target: "b1",
              value: 3,
            },
            {
              source: "b1",
              target: "a1",
              value: 1,
            },
            {
              source: "b1",
              target: "c",
              value: 2,
            },
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
