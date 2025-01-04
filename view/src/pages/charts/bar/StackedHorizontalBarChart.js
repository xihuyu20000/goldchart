export async function StackedHorizontalBarChart() {
  const resp = await $chart({
    chart_id: "/bar/StackedHorizontalBarChart",
  });
  const option = {
    title: [
      {
        show: true,
        text: "堆叠条形图",
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
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: { fontWeight: {}, textStyle: {} },
    grid: [
      {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
    ],

    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 302, 301, 334, 390, 330, 320],
      },
      {
        name: "Mail Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Affiliate Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [150, 212, 201, 154, 190, 330, 410],
      },
      {
        name: "Search Engine",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // yAxis
  option.yAxis[0].data = resp.data.index;
  // series
  option.series = resp.data.values.map((curr, i, arr) => ({
    name: resp.data.columns[i],
    type: "bar",
    stack: "total",
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
