import * as echarts from "echarts";

export async function GradientStackedAreaChart() {
  const resp = await $chart({ chart_id: "/line/GradientStackedAreaChart" });
  const option = {
    title: [
      {
        show: false,
        text: "渐变堆叠面积图",
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
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },

    xAxis: [
      {
        name: "日期",
        nameLocation: "center",
        nameGap: 40,
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {},
        nameTextStyle: {},
      },
    ],
    yAxis: [
      {
        name: "数量",
        nameLocation: "center",
        nameGap: 40,
        type: "value",
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 12 },
      },
    ],
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        label: {},
        lineStyle: {},
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        label: {},
        lineStyle: {},
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        label: {},
        lineStyle: {},
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        label: {},
        lineStyle: {},
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 0, 135)",
            },
            {
              offset: 1,
              color: "rgb(135, 0, 157)",
            },
          ]),
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        label: {},
        lineStyle: {},
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "rgb(224, 62, 76)",
            },
          ]),
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };
  // columns
  option.columns = resp.data.columns;

  // x轴
  option.xAxis = [
    {
      type: "category",
      data: resp.data.index,
      name: "X轴",
      nameLocation: "center",
      nameGap: 35,
      axisLabel: {},
      nameTextStyle: { fontSize: 20 },
    },
  ];
  // y轴
  option.yAxis = [
    {
      show: true,
      name: "数量",
      nameLocation: "center",
      nameGap: 50,
      axisLabel: { show: true, fontSize: 12 },
      nameTextStyle: { fontSize: 20 },
    },
  ];
  return option;
}
