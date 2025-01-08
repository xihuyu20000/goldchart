export async function CartesianGraphChart() {
  const resp = await $chart({ chart_id: "/graph/CartesianGraphChart" });
  const axisData = [
    "Mon",
    "Tue",
    "Wed",
    "Very Loooong Thu",
    "Fri",
    "Sat",
    "Sun",
  ];
  const data = axisData.map(function (item, i) {
    return Math.round(Math.random() * 1000 * (i + 1));
  });
  const links = data.map(function (item, i) {
    return {
      source: i,
      target: i + 1,
    };
  });
  links.pop();

  const option = {
    title: [
      {
        show: true,
        text: "笛卡尔坐标关系图",
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
    tooltip: {},
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: axisData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        symbolSize: 40,
        label: {
          show: true,
        },
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        data: data,
        links: links,
        lineStyle: {
          color: "#2f4554",
        },
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;
  return option;
}
