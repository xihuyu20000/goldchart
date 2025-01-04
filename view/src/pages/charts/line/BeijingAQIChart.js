export async function BeijingAQIChart() {
  const resp = await $chart({ chart_id: "/line/BeijingAQIChart" });
  const option = {
    title: [
      {
        show: true,
        text: "Beijing AQI",
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
    grid: [{ show: true, width: "auto", height: "auto", containLabel: true }],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
      },
    },
    textStyle: { color: "#111" },
    legend: {
      show: false,
      textStyle: { fontSize: 18 },
      itemStyle: {},
      lineStyle: {},
    },

    xAxis: [
      {
        data: [],
      },
    ],
    yAxis: [{}],
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },

    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: "#93CE07",
        },
        {
          gt: 50,
          lte: 100,
          color: "#FBDB0F",
        },
        {
          gt: 100,
          lte: 150,
          color: "#FC7D02",
        },
        {
          gt: 150,
          lte: 200,
          color: "#FD0100",
        },
        {
          gt: 200,
          lte: 300,
          color: "#AA069F",
        },
        {
          gt: 300,
          color: "#AC3B2A",
        },
      ],
      outOfRange: {
        color: "#999",
      },
    },
    series: [
      {
        name: "Beijing AQI",
        type: "line",
        data: [],
        markLine: {
          silent: true,
          lineStyle: {
            color: "#333",
          },
          data: [
            {
              yAxis: 50,
            },
            {
              yAxis: 100,
            },
            {
              yAxis: 150,
            },
            {
              yAxis: 200,
            },
            {
              yAxis: 300,
            },
          ],
        },
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;

  option.xAxis[0].data = resp.data.index;
  option.series[0].data = resp.data.values[0];
  return option;
}
