export async function RadialPolarBarChart() {
  const resp = await $chart({
    chart_id: "/polar/RadialPolarBarChart",
  });
  const option = {
    title: [
      {
        show: true,
        text: "极坐标柱图",
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
    polar: {
      radius: [30, "80%"],
    },
    radiusAxis: {
      max: 4,
    },
    angleAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
      startAngle: 75,
    },
    textStyle: { color: "#111" },
    legend: {
      show: false,
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },

    series: [
      {
        type: "bar",
        data: [2, 1.2, 2.4, 3.6],
        coordinateSystem: "polar",
        label: {
          show: true,
          position: "middle",
          formatter: "{b}: {c}",
        },
      },
    ],
    animation: false,
  };

  // columns
  option.columns = resp.data.columns;

  // radiusAxis
  option.radiusAxis.max = resp.data.max;
  // angleAxis
  option.angleAxis.data = resp.data.index;
  // series
  option.series[0].data = resp.data.values[0];
  return option;
}
