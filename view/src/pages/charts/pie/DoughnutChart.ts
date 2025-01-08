export async function DoughnutChart() {
  const resp = await $chart({ chart_id: "/pie/DoughnutChart" });
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
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: true,
      top: "5%",
      left: "center",
      fontWeight: {},
      textStyle: {},
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;
  // series
  option.series[0].data = resp.data.index.map((curr, i, arr) => ({
    name: resp.data.index[i],
    value: resp.data.values[i],
  }));
  return option;
}
