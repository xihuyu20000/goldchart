import * as utils from "@/utils/utils.js";
import { reactive } from "vue";
const globalStore = useGlobalStore();
export async function BasicLineChart() {
  const resp = await $chart({ chart_id: "/line/BasicLineChart" });
  const config = reactive({
    datafile_id: "",
    xCols: [],
    yCols: [],
    columns: resp.data.columns,
    dataset: resp.data.values,
  });
  const option = {
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
        nameLocation: "center",
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
        nameLocation: "center",
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
        nameGap: 50,
        lineStyle: {},
        label: { show: true, fontSize: 12 },
        showSymbol: true,
        symbolSize: 8,
      },
    ],
  };
  console.log("调用BasicLineChart.js");
  globalStore.setConfig(config);
  globalStore.setOption(option);
}
