export async function BarColorBarChart() {
  const resp = await $chart({ chart_id: "/bar/BarColorBarChart" });
  const option = {
    title: [
      {
        show: true,
        text: "柱状图颜色",
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
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [],
  };

  // columns
  option.columns = resp.data.columns;

  // xAxis
  option.xAxis[0].data = resp.data.index;
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    data: resp.data.values[i].map((curr2, i2, arr2) => ({
      value: curr2,
      itemStyle: {
        color: "#a90000",
      },
    })),
    type: "bar",
    name: resp.data.columns[i],
    lineStyle: {},
    label: { show: true, fontSize: 12, position: "top" },
    symbolSize: 8,
    itemStyle: { color: "auto", borderWidth: 0 },
    backgroundStyle: { borderWidth: 0 },
  }));
  return option;
}
