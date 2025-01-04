export async function HalfDoughnutChart() {
  const resp = await $chart({ chart_id: "/pie/HalfDoughnutChart" });
  const option = {
    title: [
      {
        show: true,
        text: "半环图",
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
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "70%"],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "电子邮件" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" },
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
