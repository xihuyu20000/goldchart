export function SimpleParallelChart() {
  const option = {
    columns: [],
    title: [
      {
        show: true,
        text: "基础平行坐标图",
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
    parallelAxis: [
      { dim: 0, name: "Price" },
      { dim: 1, name: "Net Weight" },
      { dim: 2, name: "Amount" },
      {
        dim: 3,
        name: "Score",
        type: "category",
        data: ["Excellent", "Good", "OK", "Bad"],
      },
    ],
    series: {
      type: "parallel",
      lineStyle: {
        width: 4,
      },
      data: [
        [12.99, 100, 82, "Good"],
        [9.99, 80, 77, "OK"],
        [20, 120, 60, "Excellent"],
      ],
    },
  };
  return option;
}
