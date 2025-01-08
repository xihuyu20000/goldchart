export async function BasicAreaChart() {
  const resp = await $chart({ chart_id: "/line/BasicAreaChart" });
  const config = reactive({
    datafile_id: "",
    xCols: [],
    yCols: [],
    columns: resp.data.columns,
    dataset: resp.data.values,
  });
  const option = {
    columns: resp.data.columns,
    title: [
      {
        show: true,
        text: "基础面积图",
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
      show: false,
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },

    xAxis: [
      {
        show: true,
        type: "category",
        name: "日期",
        nameLocation: "center",
        nameGap: 40,
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 12 },
        boundaryGap: true,
        data: resp.data.index,
      },
    ],

    yAxis: [
      {
        show: true,
        name: "数量",
        nameLocation: "center",
        nameGap: 50,
        axisLabel: { show: true, fontSize: 12 },
        nameTextStyle: { fontSize: 20 },
      },
    ],
    series: resp.data.columns.map((curr, i, arr) => ({
      name: resp.data.columns[i],
      type: "line",
      data: resp.data.values[i],
      areaStyle: {},
      label: { show: true, fontSize: 12 },
      lineStyle: { width: 2, type: "solid", fontSize: 12 },
      showSymbol: true,
    })),
  };
  globalStore.setConfig(config);
  globalStore.setOption(option);
}
