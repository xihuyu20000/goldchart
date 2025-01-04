export async function BasicScatterChart() {
  const resp = await $chart({
    chart_id: "/scatter/BasicScatterChart",
  });

  const option = {
    title: [
      {
        show: true,
        text: "基本散点图",
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
    tooltip: { show: true, trigger: "item" },
    xAxis: [{}],
    yAxis: [{}],
    series: [
      {
        symbolSize: 20,
        data: [],
        type: "scatter",
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;
  option.series[0].data = resp.data.values[0].map((curr, i, arr) => [
    resp.data.values[0][i],
    resp.data.values[1][i],
  ]);
  return option;
}
