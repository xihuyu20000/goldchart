import * as echarts from "echarts";
export async function GradientLineChart() {
  const resp = await $chart({ chart_id: "/line/GradientLineChart" });
  const data = [
    ["2000-06-05", 116],
    ["2000-06-06", 129],
    ["2000-06-07", 135],
    ["2000-06-08", 86],
    ["2000-06-09", 73],
    ["2000-06-10", 85],
    ["2000-06-11", 73],
    ["2000-06-12", 68],
    ["2000-06-13", 92],
    ["2000-06-14", 130],
    ["2000-06-15", 245],
    ["2000-06-16", 139],
    ["2000-06-17", 115],
    ["2000-06-18", 111],
    ["2000-06-19", 309],
    ["2000-06-20", 206],
    ["2000-06-21", 137],
    ["2000-06-22", 128],
    ["2000-06-23", 85],
    ["2000-06-24", 94],
    ["2000-06-25", 71],
    ["2000-06-26", 106],
    ["2000-06-27", 84],
    ["2000-06-28", 93],
    ["2000-06-29", 85],
    ["2000-06-30", 73],
    ["2000-07-01", 83],
    ["2000-07-02", 125],
    ["2000-07-03", 107],
    ["2000-07-04", 82],
    ["2000-07-05", 44],
    ["2000-07-06", 72],
    ["2000-07-07", 106],
    ["2000-07-08", 107],
    ["2000-07-09", 66],
    ["2000-07-10", 91],
    ["2000-07-11", 92],
    ["2000-07-12", 113],
    ["2000-07-13", 107],
    ["2000-07-14", 131],
    ["2000-07-15", 111],
    ["2000-07-16", 64],
    ["2000-07-17", 69],
    ["2000-07-18", 88],
    ["2000-07-19", 77],
    ["2000-07-20", 83],
    ["2000-07-21", 111],
    ["2000-07-22", 57],
    ["2000-07-23", 55],
    ["2000-07-24", 60],
  ];
  const dateList = data.map(function (item) {
    return item[0];
  });
  const valueList = data.map(function (item) {
    return item[1];
  });
  const option = {
    title: [
      {
        show: true,
        text: "折叠图面积高亮",
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
    grid: [{ width: "auto", height: "auto", containLabel: true }],
    // tooltip
    tooltip: {
      trigger: "axis",
    },
    textStyle: { color: "#111" },
    legend: {
      show: false,
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },
  };

  // columns
  option.columns = resp.data.columns;
  // title
  option.title = resp.data.columns.map((curr, i, arr) => ({
    show: true,
    text: resp.data.columns[i],
    top: `${i * (100 / arr.length) + 2}%`,
    left: "center",
    textAlign: "center",
    textVerticalAlign: "middle",
    textStyle: {
      color: "#000",
      fontSize: 22,
      fontWeight: 600,
      fontFamily: "Microsoft Yahei",
    },
  }));
  // grid
  option.grid = resp.data.columns.map((curr, i, arr) => ({
    width: "auto",
    height: "auto",
    top: `${i * (100 / arr.length) + 10}%`,
    height: `${100 / arr.length - 15}%`,
  }));

  // xAxis
  option.xAxis = resp.data.values.map((curr, i, arr) => ({
    data: resp.data.values[i],
    gridIndex: i,
  }));
  // yAxis
  option.yAxis = resp.data.values.map((curr, i, arr) => ({
    gridIndex: i,
  }));
  // series
  option.series = resp.data.values.map((curr, i, arr) => ({
    type: "line",
    showSymbol: false,
    data: resp.data.values[i],
    xAxisIndex: i,
    yAxisIndex: i,
    label: { show: true, fontSize: 12 },
    showSymbol: true,
    symbolSize: 8,
  }));
  // visualMap
  option.visualMap = resp.data.values.map((curr, i, arr) => ({
    show: false,
    type: "continuous",
    seriesIndex: i,
  }));
  return option;
}
