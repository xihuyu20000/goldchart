import * as utils from "@/utils/utils.js";
// export async function BasicLineChart() {
//   const resp = await $chart({ chart_id: "/line/BasicLineChart" });
//   const option = {
//     columns: resp.data.columns,
//     title: [
//       {
//         show: true,
//         text: "基础线性图",
//         top: "2%",
//         left: "50%",
//         textAlign: "center",
//         textVerticalAlign: "middle",
//         textStyle: {
//           color: "#333",
//           fontSize: 22,
//           fontWeight: 600,
//           fontFamily: "Microsoft Yahei",
//         },
//       },
//     ],
//     grid: [
//       {
//         show: true,
//         width: "auto",
//         height: "auto",
//         left: "10%",
//         top: 60,
//         right: "10%",
//         bottom: 60,
//         containLabel: true,
//       },
//     ],
//     textStyle: { color: "#111" },
//     tooltip: {
//       trigger: "axis",
//     },
//     legend: {
//       show: false,
//       textStyle: { fontSize: 18 },
//       itemStyle: {},
//       lineStyle: {},
//     },
//     xAxis: [
//       {
//         show: true,
//         type: "category",
//         name: "X轴",
//         nameLocation: "center",
//         nameGap: 35,
//         axisLabel: { show: true },
//         nameTextStyle: { fontSize: 20 },
//         data: resp.data.index,
//       },
//     ],

//     yAxis: [
//       {
//         show: true,
//         type: "value",
//         name: "Y轴",
//         nameLocation: "center",
//         nameGap: 50,
//         axisLabel: {},
//         nameTextStyle: { fontSize: 20 },
//       },
//     ],
//     series: resp.data.columns.map((curr, i, arr) => ({
//       data: resp.data.values[i],
//       type: "line",
//       name: resp.data.columns[i],
//       nameGap: 50,
//       lineStyle: {},
//       label: { show: true, fontSize: 12 },
//       showSymbol: true,
//       symbolSize: 8,
//     })),
//   };

//   return option;
// }
export function BasicLineChart() {
  const option = new MyBaseOption();
  return option;
}
