export async function MultiLinesChart() {
  const resp = await $chart({ chart_id: "/line/MultiLinesChart" });
  const option = {
    title: [
      {
        show: false,
        text: "多折线图",
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
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },

    xAxis: [
      {
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 12 },
        name: "日期",
        nameLocation: "center",
        nameGap: 40,
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 12 },
        name: "数量",
        nameLocation: "center",
        nameGap: 40,
        type: "value",
      },
    ],
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
        label: { show: true, fontSize: 12 },
        lineStyle: { width: 2, color: "#000", type: "solid" },
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
        label: { show: true, fontSize: 12 },
        lineStyle: { width: 2, color: "#000", type: "solid" },
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
        label: { show: true, fontSize: 12 },
        lineStyle: { width: 2, color: "#000", type: "solid" },
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
        label: { show: true, fontSize: 12 },
        lineStyle: { width: 2, color: "#000", type: "solid" },
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        label: { show: true, fontSize: 12 },
        lineStyle: { width: 2, color: "#000", type: "solid" },
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  // x轴
  option.xAxis = [
    {
      show: true,
      type: "category",
      name: "X轴",
      nameLocation: "center",
      nameGap: 35,
      axisLabel: { show: true },
      nameTextStyle: { fontSize: 20 },
      data: resp.data.index,
    },
  ];
  // y轴
  option.yAxis = [
    {
      show: true,
      type: "value",
      name: "Y轴",
      nameLocation: "center",
      nameGap: 50,
      axisLabel: {},
      nameTextStyle: { fontSize: 20 },
    },
  ];
  // series
  option.series = resp.data.columns.map((curr, i, arr) => ({
    type: "line",
    stack: "Total",
    nameGap: 50,
    lineStyle: { width: 4, type: "solid" },
    label: { show: true, fontSize: 12 },
    showSymbol: true,
    name: resp.data.columns[i],
    data: resp.data.values[i],
  }));

  return option;
}
