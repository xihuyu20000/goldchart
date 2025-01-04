import { text } from "d3";

export async function NegativeValueHorizontalBarChart() {
  const resp = await $chart({
    chart_id: "/bar/NegativeValueHorizontalBarChart",
  });

  const labelRight = {
    position: "right",
  };
  const option = {
    title: [
      {
        show: true,
        text: "正负值多系列条形图",
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
    textStyle: { color: "#111" },
    grid: [
      {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    ],

    legend: {
      data: ["Profit", "Expenses", "Income"],
      fontWeight: {},
      textStyle: {},
    },

    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    series: [
      {
        name: "Profit",
        type: "bar",
        label: {
          show: true,
          position: "inside",
        },
        emphasis: {
          focus: "series",
        },
        data: [200, 170, 240, 244, 200, 220, 210],
      },
      {
        name: "Income",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 302, 341, 374, 390, 450, 420],
      },
      {
        name: "Expenses",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          position: "left",
        },
        emphasis: {
          focus: "series",
        },
        data: [-120, -132, -101, -134, -190, -230, -210],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // yAxis
  option.yAxis[0].data = resp.data.index;
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    name: resp.data.columns[i],
    type: "bar",
    //stack: "Total",
    label: {
      show: true,
    },
    emphasis: {
      focus: "series",
    },
    data: resp.data.values[i],
  }));
  return option;
}
