export async function AreaPiecesChart() {
  const resp = await $chart({ chart_id: "/line/AreaPiecesChart" });
  const option = {
    title: [
      {
        show: true,
        text: "折叠图面积高亮",
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
        name: "X轴",
        nameLocation: "center",
        axisLabel: {},
        nameTextStyle: {},
        type: "category",
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        show: true,
        type: "value",
        boundaryGap: [0, "30%"],
        nameLocation: "center",
        axisLabel: {},
        nameTextStyle: {},
      },
    ],
    visualMap: {
      type: "piecewise",
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: "rgba(0, 0, 180, 0.4)",
        },
        {
          gt: 5,
          lt: 7,
          color: "rgba(0, 0, 180, 0.4)",
        },
      ],
    },
    series: [
      {
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          color: "#5470C6",
          width: 5,
        },
        markLine: {
          symbol: ["none", "none"],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        },
        areaStyle: {},
        data: [
          ["2019-10-10", 200],
          ["2019-10-11", 560],
          ["2019-10-12", 750],
          ["2019-10-13", 580],
          ["2019-10-14", 250],
          ["2019-10-15", 300],
          ["2019-10-16", 450],
          ["2019-10-17", 300],
          ["2019-10-18", 100],
        ],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // x轴
  option.xAxis = [
    {
      show: true,
      type: "category",
      name: "X轴",
      nameLocation: "center",
      nameGap: 35,
      axisLabel: { show: true },
      nameTextStyle: { fontSize: 20 },
      data: resp.data.index,
    },
  ];
  // y轴
  option.yAxis = [
    {
      show: true,
      type: "value",
      name: "Y轴",
      nameLocation: "center",
      nameGap: 50,
      axisLabel: {},
      nameTextStyle: { fontSize: 20 },
    },
  ];
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    data: resp.data.values[i],
    type: "line",
    name: resp.data.columns[i],
    nameGap: 50,
    areaStyle: {},
    smooth: true,
    label: { show: true, fontSize: 12 },
    symbol: "none",
    lineStyle: {
      color: "#5470C6",
      width: 5,
    },
    symbolSize: 8,
    markLine: {
      symbol: ["none", "none"],
      label: { show: false },
      data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
    },
  }));
  return option;
}
