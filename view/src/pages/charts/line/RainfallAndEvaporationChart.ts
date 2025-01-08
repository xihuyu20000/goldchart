export async function RainfallAndEvaporationChart() {
  const resp = await $chart({ chart_id: "/line/RainfallAndEvaporationChart" });
  const option = {
    title: [
      {
        show: true,
        text: "降雨量和蒸发量",
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
        left: 60,
        right: 50,
        height: "35%",
        containLabel: true,
      },
      {
        left: 60,
        right: 50,
        top: "55%",
        height: "35%",
        containLabel: true,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
      },
    },
    legend: {
      data: ["Evaporation", "Rainfall"],
      left: 10,
      textStyle: {},
    },

    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
    },
  };

  // columns
  option.columns = resp.data.columns;

  // xAxis
  option.xAxis = [
    {
      gridIndex: 0,
      type: "category",
      boundaryGap: false,
      axisLine: { onZero: true },
      data: resp.data.values[0],
    },
    {
      gridIndex: 1,
      type: "category",
      boundaryGap: false,
      axisLine: { onZero: true },
      data: resp.data.values[1],
      position: "top",
    },
  ];
  // yAxis
  option.yAxis = [
    {
      gridIndex: 0,
      name: resp.data.columns[0],
      type: "value",
      max: 500,
    },
    {
      gridIndex: 1,
      name: resp.data.columns[1],
      type: "value",
      inverse: true,
    },
  ];
  // series
  option.series = [
    {
      name: resp.data.columns[0],
      type: "line",
      symbolSize: 8,
      data: resp.data.values[0],
    },
    {
      name: resp.data.columns[1],
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 1,
      symbolSize: 8,
      data: resp.data.values[1],
    },
  ];
  return option;
}
