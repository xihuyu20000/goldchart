export async function BumpChart() {
  const resp = await $chart({ chart_id: "/line/BumpChart" });
  const option = {
    title: [
      {
        show: false,
        text: "凹凸图",
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
      show: true,
      itemGap: 10,
      textStyle: { fontSize: 12, color: "#333" },
    },

    xAxis: [
      {
        type: "category",
        splitLine: {
          show: true,
        },
        axisLabel: {
          margin: 30,
          fontSize: 16,
        },
        boundaryGap: false,
        data: [],
      },
    ],
    yAxis: {
      type: "value",
      axisLabel: {
        margin: 30,
        fontSize: 16,
        formatter: "#{value}",
      },
      inverse: true,
      interval: 10,
      min: 0,
      max: 100,
    },
    series: [],
  };

  // columns
  option.columns = resp.data.columns;

  // x轴
  option.xAxis = [
    {
      show: true,
      type: "category",
      name: "",
      nameLocation: "center",
      nameGap: 35,
      splitLine: {
        show: true,
      },
      axisLabel: { show: true, margin: 30, fontSize: 16 },
      nameTextStyle: { fontSize: 20 },
      boundaryGap: false,
      data: resp.data.index,
    },
  ];
  // y轴
  option.yAxis = [
    {
      show: true,
      type: "value",
      name: "",
      nameLocation: "center",
      nameGap: 50,
      nameTextStyle: { fontSize: 20 },
      axisLabel: {
        margin: 30,
        fontSize: 16,
        formatter: "#{value}",
      },
      min: resp.data.min,
      max: resp.data.max,
      interval: resp.data.max / 10,
    },
  ];
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    type: "line",
    smooth: true,
    emphasis: {
      focus: "series",
    },
    endLabel: {
      show: true,
      formatter: "{a}",
      distance: 20,
    },
    lineStyle: {
      width: 4,
    },
    showSymbol: true,
    symbolSize: 20,
    name: resp.data.columns[i],
    data: resp.data.values[i],
  }));

  return option;
}
