export async function WorldPopulationBarChart() {
  const resp = await $chart({
    chart_id: "/bar/WorldPopulationBarChart",
  });
  const option = {
    title: [
      {
        show: true,
        text: "世界人口条状图",
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: { fontWeight: {}, textStyle: {} },
    grid: [
      {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    ],

    xAxis: [
      {
        type: "value",
        boundaryGap: [0, 0.01],
      },
    ],
    yAxis: [
      {
        type: "category",
        data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
      },
    ],
    series: [
      {
        name: "2011",
        type: "bar",
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
      {
        name: "2012",
        type: "bar",
        data: [19325, 23438, 31000, 121594, 134141, 681807],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // yAxis
  option.yAxis[0].data = resp.data.index;
  // series
  option.series = resp.data.values.map((curr, i, arr) => ({
    name: resp.data.columns[i],
    type: "bar",
    data: resp.data.values[i],
  }));
  return option;
}
