export async function RoseChart() {
  const resp = await $chart({ chart_id: "/pie/RoseChart" });
  const option = {
    title: [
      {
        show: true,
        text: "玫瑰图",
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
    legend: {
      show: true,
      top: "bottom",
      fontWeight: {},
      textStyle: {},
    },

    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 38, name: "rose 2" },
          { value: 32, name: "rose 3" },
          { value: 30, name: "rose 4" },
          { value: 28, name: "rose 5" },
          { value: 26, name: "rose 6" },
          { value: 22, name: "rose 7" },
          { value: 18, name: "rose 8" },
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
