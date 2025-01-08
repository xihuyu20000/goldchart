export async function RadialPolarStackedBarChart() {
  const resp = await $chart({
    chart_id: "/polar/RadialPolarStackedBarChart",
  });
  const option = {
    title: [
      {
        show: true,
        text: "极坐标堆叠图",
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
    polar: {},
    radiusAxis: {},
    angleAxis: {
      type: "category",
      data: [],
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
        data: [],
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
  option.series = resp.data.values.map((curr, i, arr) => ({
    type: "bar",
    data: curr,
    coordinateSystem: "polar",
    name: resp.data.columns[i],
    stack: resp.data.columns[0],
    emphasis: {
      focus: "series",
    },
  }));
  return option;
}
