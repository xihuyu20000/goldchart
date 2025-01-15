import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class BasicPieChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: true,
          text: "基本饼图",
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
        orient: "vertical",
        left: "right",
        textStyle: {},
      },

      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    return option;
  }
  async protect(): Promise<boolean> {
    console.warn("protect", toRaw(globalStore.config));
    // 1 判断config是否完整
    if (globalStore.config.user_id.length == 0 || globalStore.config.chart_id.length == 0 || globalStore.config.xCols.length == 0 || globalStore.config.yCols.length == 0) {
      console.warn("protect", "数据集不完整", toRaw(globalStore.config));
      return false;
    }
    // 2 后端获取数据集
    const req_config = Object.assign({}, globalStore.config);
    const resp = await $post("/api/chart/getdata_by", req_config);

    globalStore.setChart(resp.chart_columns, resp.chart_datas);

    // 2.1 处理数据
    const datas = {};
    for (let i = 0; i < globalStore.chart.columns.length; i++) {
      const col = globalStore.chart.columns[i];
      datas[col] = globalStore.chart.datas.map((item) => item[i]);
    }

    // 4 根据yCols对series赋值
    let is_series_data = false;
    if (globalStore.chart.datas.length > 0) {
      globalStore.option.series = [];

      const pie_data = globalStore.chart.datas.map((item) => ({ name: item[0], value: item[1] }));

      const obj: echarts.PieSeriesOption = {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: pie_data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      };
      if (obj.data.length > 0) {
        is_series_data = true;
      }
      globalStore.option.series.push(obj);
    }

    if (is_series_data) {
      console.warn("protect", "数据完整", toRaw(globalStore.option));
      return true;
    }
    return false;
  }
}
