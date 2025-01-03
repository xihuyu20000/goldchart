export async function BasicPieChart() {
  const resp = await $chart({ chart_id: "/pie/BasicPieChart" });
  const option = {
    title: [
      {
        show: true,
        text: "基本饼图",
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
      trigger: "item",
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "right",
      fontWeight: {},
      textStyle: {},
    },

    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "50%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;
  // series
  option.series[0].data = resp.data.index.map((curr, i, arr) => ({
    name: resp.data.index[i],
    value: resp.data.values[i],
  }));
  return option;
}
