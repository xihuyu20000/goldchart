export async function BgcolorBarChart() {
  const resp = await $chart({ chart_id: "/bar/BgcolorBarChart" });
  const option = {
    title: [
      {
        show: true,
        text: "柱状图背景色",
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
        show: false,
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
        type: "category",
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
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
      axisLabel: {},
      nameTextStyle: {},
    },
  ];
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    data: resp.data.values[i],
    type: "bar",
    name: resp.data.columns[i],
    lineStyle: {},
    label: { show: true, fontSize: 12, position: "top" },
    symbolSize: 8,
    showBackground: true,
  }));
  return option;
}
