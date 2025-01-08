export async function MultipleYBarChart() {
  const resp = await $chart({ chart_id: "/bar/MultipleYBarChart" });
  const option = {
    title: [
      {
        show: true,
        text: "双Y轴折柱混合图",
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
        type: "cross",
      },
    },
    grid: [
      {
        right: "20%",
        containLabel: true,
      },
    ],

    textStyle: { color: "#111" },
    legend: {
      data: ["Evaporation", "Precipitation", "Temperature"],
      fontWeight: {},
      textStyle: {},
    },

    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        // prettier-ignore
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Evaporation",
        position: "right",
      },
      {
        type: "value",
        name: "Precipitation",
        position: "right",
        offset: 80,
      },
      {
        type: "value",
        name: "温度",
        position: "left",
      },
    ],
    series: [
      {
        name: "Evaporation",
        type: "bar",
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
      },
      {
        name: "Precipitation",
        type: "bar",
        yAxisIndex: 1,
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        name: "Temperature",
        type: "line",
        yAxisIndex: 2,
        data: [
          2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
        ],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // xAxis
  option.xAxis[0].data = resp.data.index;
  // yAxis
  option.yAxis = resp.data.columns.map((curr, i, arr) => ({
    type: "value",
    name: curr,
    position: i < 1 ? "left" : "right",
  }));
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    name: resp.data.columns[i],
    type: i < 1 ? "line" : "bar",
    yAxisIndex: i,
    data: resp.data.values[i],
  }));
  return option;
}
