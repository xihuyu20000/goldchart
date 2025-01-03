export async function BasicBarChart() {
  const resp = await $chart({ chart_id: "/bar/BasicBarChart" });
  const option = {
    title: [
      {
        show: true,
        text: "基本柱状图",
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
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        label: { show: true, fontSize: 12, position: "top" },
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
  }));

  return option;
}
