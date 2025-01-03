export async function SimpleRiverChart() {
  const resp = await $chart({ chart_id: "/river/SimpleRiverChart" });
  const option = {
    columns: [],
    title: [
      {
        show: true,
        text: "基本河流图",
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
        type: "line",
        lineStyle: {
          color: "rgba(0,0,0,0.2)",
          width: 1,
          type: "solid",
        },
      },
    },
    legend: {
      textStyle: {},
      fontWeight: {},
      data: resp.data.columns,
    },
    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: "time",
      axisPointer: {
        animation: true,
        label: {
          show: true,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          opacity: 0.2,
        },
      },
    },
    series: [
      {
        type: "themeRiver",
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.8)",
          },
        },
        data: [],
      },
    ],
  };
  const datas = [];

  for (const i in resp.data.columns) {
    for (const j in resp.data.index) {
      datas.push([
        resp.data.index[j],
        resp.data.values[i][j],
        resp.data.columns[i],
      ]);
    }
  }
  option.series[0].data = datas;
  return option;
}
