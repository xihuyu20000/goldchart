export async function BasicRadarChart() {
  const resp = await $chart({ chart_id: "/radar/BasicRadarChart" });
  const option = {
    title: [
      {
        show: true,
        text: "基本雷达图",
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
      data: ["Allocated Budget", "Actual Spending"],
      fontWeight: {},
      textStyle: {},
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Technology", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  };

  // columns
  option.columns = resp.data.columns;
  option.radar.indicator = resp.data.indicator;
  option.series[0].data = [];
  for (const i in resp.data.columns) {
    const obj = {};
    obj["name"] = resp.data.columns[i];
    obj["value"] = resp.data.values[i];
    option.series[0].data.push(obj);
  }
  return option;
}
