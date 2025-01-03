export async function NegativeValueBarChart() {
  const resp = await $chart({ chart_id: "/bar/NegativeValueBarChart" });
  const labelRight = {
    position: "right",
  };
  const option = {
    title: [
      {
        show: true,
        text: "负值柱状图",
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
    },
    grid: [
      {
        top: 80,
        bottom: 30,
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
        type: "value",
        position: "top",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: [
          "ten",
          "nine",
          "eight",
          "seven",
          "six",
          "five",
          "four",
          "three",
          "two",
          "one",
        ],
      },
    ],
    series: [
      {
        name: "Cost",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          formatter: "{b}",
        },
        data: [
          {
            value: -0.07,
            label: {
              position: "right",
            },
          },
          {
            value: -0.09,
            label: {
              position: "right",
            },
          },
          0.2,
          0.44,
          {
            value: -0.23,
            label: {
              position: "right",
            },
          },
          0.08,
          {
            value: -0.17,
            label: {
              position: "right",
            },
          },
          0.47,
          {
            value: -0.36,
            label: {
              position: "right",
            },
          },
          0.18,
        ],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // yAxis
  option.yAxis[0].data = resp.data.index;
  // series
  option.series[0].name = resp.data.columns[0];
  option.series[0].data = resp.data.values[0].map((curr, i, arr) => ({
    value: curr,
    label: {
      position: curr < 0 ? "right" : "left",
    },
  }));
  return option;
}
