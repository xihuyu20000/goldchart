import { toRaw } from "vue";
import { IChart } from "@/utils/types";
import * as echarts from "echarts";
import { useGlobalStore } from "@/utils/global";
const globalStore = useGlobalStore();

export class StackedLineChart extends IChart {
  get_option(): echarts.EChartsOption {
    const option: echarts.EChartsOption = {
      title: [
        {
          show: false,
          text: "堆叠折线图",
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
      grid: [
        {
          show: true,
          width: "auto",
          height: "auto",
          left: "10%",
          top: 60,
          right: "10%",
          bottom: 60,
          containLabel: true,
        },
      ],
      textStyle: { color: "#111" },
      legend: {
        show: true,
        itemGap: 10,
        textStyle: { fontSize: 18 },
        itemStyle: {},
        lineStyle: {},
      },

      xAxis: [
        {
          axisLabel: { show: true, fontSize: 12 },
          nameTextStyle: { fontSize: 12 },
          name: "日期",
          nameLocation: "middle",
          nameGap: 40,
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          axisLabel: { show: true, fontSize: 12 },
          nameTextStyle: { fontSize: 12 },
          name: "数量",
          nameLocation: "middle",
          nameGap: 40,
          type: "value",
        },
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
          label: { show: true, fontSize: 12 },
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          label: { show: true, fontSize: 12 },
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

    globalStore.setChartColumns(resp.chart_columns);
    globalStore.setChartDatas(resp.chart_datas);

    // 2.1 处理数据
    const datas = {};
    for (let i = 0; i < globalStore.chart.columns.length; i++) {
      const col = globalStore.chart.columns[i];
      datas[col] = globalStore.chart.datas.map((item) => item[i]);
    }
    // 3 根据xCols对xAxis赋值
    let is_xAxis_data: boolean = false;
    if (globalStore.chart.columns.length > 0) {
      globalStore.option.xAxis = [];

      const intersection = globalStore.config.xCols.map((item) => item.name).filter((element) => globalStore.chart.columns.includes(element));

      for (const col of intersection) {
        const obj: echarts.XAXisComponentOption = {
          show: true,
          type: "category",
          name: col,
          nameLocation: "middle",
          nameGap: 35,
          axisLabel: { show: true },
          nameTextStyle: { fontSize: 20 },
          data: datas[col],
        };
        globalStore.option.xAxis.push(obj);
      }
      if (globalStore.option.xAxis.length > 0) {
        is_xAxis_data = true;
      }
    }

    // 4 根据yCols对series赋值
    let is_series_data = false;
    if (globalStore.chart.datas.length > 0) {
      globalStore.option.series = [];

      const intersection = globalStore.config.yCols.map((item) => item.name).filter((element) => globalStore.chart.columns.includes(element));

      for (const col of intersection) {
        const obj: echarts.LineSeriesOption = {
          data: datas[col],
          type: "line",
          name: col,
          lineStyle: {},
          label: { show: true, fontSize: 12 },
          showSymbol: true,
          symbolSize: 8,
          stack: "Total",
        };
        if (obj.data.length > 0) {
          is_series_data = true;
        }
        globalStore.option.series.push(obj);
      }
    }
    console.warn("protect", is_xAxis_data, is_series_data);
    if (is_xAxis_data && is_series_data) {
      console.warn("protect", "数据完整", toRaw(globalStore.option));
      return true;
    }
    return false;
  }
}
