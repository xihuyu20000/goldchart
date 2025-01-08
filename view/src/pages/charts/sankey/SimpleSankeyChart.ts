export async function SimpleSankeyChart() {
  const resp = await $chart({ chart_id: "/sankey/SimpleSankeyChart" });
  const option = {
    columns: [],
    title: [
      {
        show: true,
        text: "基础桑吉图",
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
    series: [
      {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        data: [],
        links: [],
      },
    ],
  };

  option.series[0].data = resp.data.data;
  option.series[0].links = resp.data.links;
  return option;
}
