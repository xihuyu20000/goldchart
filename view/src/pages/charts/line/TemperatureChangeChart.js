export async function TemperatureChangeChart() {
  const resp = await $chart({ chart_id: "/line/TemperatureChangeChart" });
  const option = {
    title: [
      {
        show: true,
        text: "气温变化",
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
        boundaryGap: false,
        nameLocation: "center",
        axisLabel: {},
        nameTextStyle: {},
        data: [],
      },
    ],
    yAxis: [
      {
        show: true,
        type: "value",
        nameLocation: "center",
        axisLabel: {
          formatter: "{value} °C",
        },
        nameTextStyle: {},
      },
    ],
    series: [
      {
        name: "Highest",
        type: "line",
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
      {
        name: "Lowest",
        type: "line",
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" },
            [
              {
                symbol: "none",
                x: "90%",
                yAxis: "max",
              },
              {
                symbol: "circle",
                label: {
                  position: "start",
                  formatter: "Max",
                },
                type: "max",
                name: "最高点",
              },
            ],
          ],
        },
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
    name: resp.data.columns[i],
    type: "line",
    data: resp.data.values[i],
    markPoint: {
      data: [
        { type: "max", name: "Max" },
        { type: "min", name: "Min" },
      ],
    },
    markLine: {
      data: [{ type: "average", name: "Avg" }],
    },
    label: { show: true, fontSize: 12 },
    showSymbol: true,
    symbolSize: 8,
  }));

  return option;
}
