import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class RoseChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
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

    return option;
  }
  async wrap_option(): Promise<boolean> {
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
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: pie_data,
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
