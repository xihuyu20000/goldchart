export async function RainfallAndFlowChart() {
  const resp = await $chart({ chart_id: "/line/RainfallAndFlowChart" });
  const option = {
    title: [
      {
        show: true,
        text: "降雨量和流量",
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
    grid: [{ width: "auto", height: "auto", bottom: 80, containLabel: true }],
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        animation: false,
        label: {
          backgroundColor: "#505765",
        },
      },
    },
    legend: {
      data: ["Flow", "Rainfall"],
      left: 10,
      textStyle: {},
    },

    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 65,
        end: 85,
      },
      {
        type: "inside",
        realtime: true,
        start: 65,
        end: 85,
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: false },
        // prettier-ignore
        data: [],
      },
    ],
    yAxis: [
      {
        name: "Flow(m³/s)",
        type: "value",
      },
      {
        name: "Rainfall(mm)",
        nameLocation: "start",
        alignTicks: true,
        type: "value",
        inverse: true,
      },
    ],
    series: [
      {
        name: "Flow",
        type: "line",
        areaStyle: {},
        lineStyle: {
          width: 1,
        },
        emphasis: {
          focus: "series",
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.3,
          },
          data: [
            [
              {
                xAxis: "2009/9/12\n7:00",
              },
              {
                xAxis: "2009/9/22\n7:00",
              },
            ],
          ],
        },
        // prettier-ignore
        data: [],
      },
      {
        name: "Rainfall",
        type: "line",
        yAxisIndex: 1,
        areaStyle: {},
        lineStyle: {
          width: 1,
        },
        emphasis: {
          focus: "series",
        },
        markArea: {
          silent: true,
          itemStyle: {
            opacity: 0.3,
          },
          data: [
            [
              {
                xAxis: "2009/9/10\n7:00",
              },
              {
                xAxis: "2009/9/20\n7:00",
              },
            ],
          ],
        },
        // prettier-ignore
        data: [],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // xAxis
  option.xAxis = [
    {
      type: "category",
      boundaryGap: false,
      axisLine: { onZero: false },
      data: resp.data.index,
    },
  ];
  option.yAxis = [
    {
      name: resp.data.columns[0],
      type: "value",
    },
    {
      name: resp.data.columns[1],
      nameLocation: "start",
      alignTicks: true,
      type: "value",
      inverse: true,
    },
  ];
  option.series = [
    {
      name: "Flow",
      type: "line",
      areaStyle: {},
      lineStyle: {
        width: 1,
      },
      emphasis: {
        focus: "series",
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
        },
      },
      // prettier-ignore
      data: resp.data.values[0],
    },
    {
      name: "Rainfall",
      type: "line",
      yAxisIndex: 1,
      areaStyle: {},
      lineStyle: {
        width: 1,
      },
      emphasis: {
        focus: "series",
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3,
        },
      },
      // prettier-ignore
      data: resp.data.values[0],
    },
  ];
  return option;
}
