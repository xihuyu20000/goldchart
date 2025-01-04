export function MultipleFunnelChart() {
  const option = {
    columns: [],
    title: [
      {
        show: true,
        text: "折叠图多漏斗图面积高亮",
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
      formatter: "{a} <br/>{b} : {c}%",
    },

    legend: {
      orient: "vertical",
      left: "right",
      data: ["Show", "Click", "Visit", "Inquiry", "Order"],
      textStyle: {},
      fontWeight: {},
    },
    series: [
      {
        name: "Funnel",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "5%",
        top: "50%",
        data: [
          { value: 60, name: "Visit" },
          { value: 30, name: "Inquiry" },
          { value: 10, name: "Order" },
          { value: 80, name: "Click" },
          { value: 100, name: "Show" },
        ],
      },
      {
        name: "Pyramid",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "5%",
        top: "5%",
        sort: "ascending",
        data: [
          { value: 60, name: "Visit" },
          { value: 30, name: "Inquiry" },
          { value: 10, name: "Order" },
          { value: 80, name: "Click" },
          { value: 100, name: "Show" },
        ],
      },
      {
        name: "Funnel",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "55%",
        top: "5%",
        label: {
          position: "left",
        },
        data: [
          { value: 60, name: "Visit" },
          { value: 30, name: "Inquiry" },
          { value: 10, name: "Order" },
          { value: 80, name: "Click" },
          { value: 100, name: "Show" },
        ],
      },
      {
        name: "Pyramid",
        type: "funnel",
        width: "40%",
        height: "45%",
        left: "55%",
        top: "50%",
        sort: "ascending",
        label: {
          position: "left",
        },
        data: [
          { value: 60, name: "Visit" },
          { value: 30, name: "Inquiry" },
          { value: 10, name: "Order" },
          { value: 80, name: "Click" },
          { value: 100, name: "Show" },
        ],
      },
    ],
  };
  return option;
}
