import * as echarts from "echarts";
export function BasicAreaChart(): echarts.EChartsOption {
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
        show: true,
        type: "category",
        name: "日期",
        nameLocation: "middle",
        nameGap: 40,
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 12 },
        boundaryGap: true,
        data: [],
      },
    ],

    yAxis: [
      {
        show: true,
        name: "数量",
        nameLocation: "middle",
        nameGap: 50,
        axisLabel: { show: true, fontSize: 12 },
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
