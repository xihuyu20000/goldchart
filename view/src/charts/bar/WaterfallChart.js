export async function WaterfallChart() {
  const resp = await $chart({
    chart_id: "/bar/WaterfallChart",
  });
  const option = {
    title: [
      {
        show: true,
        text: "瀑布图",
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
      formatter: function (params) {
        var tar = params[1];
        return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
      },
    },
    grid: [
      {
        left: "3%",
        right: "4%",
        bottom: "3%",
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
        splitLine: { show: false },
        data: [
          "Total",
          "Rent",
          "Utilities",
          "Transportation",
          "Meals",
          "Other",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Placeholder",
        type: "bar",
        stack: "Total",
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
        emphasis: {
          itemStyle: {
            borderColor: "transparent",
            color: "transparent",
          },
        },
        data: [0, 1700, 1400, 1200, 300, 0],
      },
      {
        name: "Life Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "inside",
        },
        data: [2900, 1200, 300, 200, 900, 300],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // xAxis
  option.xAxis[0].data = resp.data.index;
  // series
  option.series = [
    {
      name: resp.data.columns[0],
      type: "bar",
      stack: "Total",
      itemStyle: {
        borderColor: "transparent",
        color: "transparent",
      },
      emphasis: {
        itemStyle: {
          borderColor: "transparent",
          color: "transparent",
        },
      },
      data: resp.data.values[0],
    },
    {
      name: resp.data.columns[1],
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        position: "inside",
      },
      data: resp.data.values[1],
    },
  ];
  return option;
}
