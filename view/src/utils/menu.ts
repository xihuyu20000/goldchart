type MenuItem = {
  url: string;
  label: string;
  rules?: { x: number[]; y: number[] };
};
type ChartStyle = {
  name: string;
  values: MenuItem[];
};
class menu {
  static space_menu_configs = (): MenuItem[] => {
    return [
      {
        url: "/space/Projects",
        label: "我的项目",
      },
      {
        url: "/space/Connects",
        label: "数据连接",
      },
      {
        url: "/space/Datasets",
        label: "我的数据集",
      },
      {
        url: "/space/Charts",
        label: "我的图表",
      },
      {
        url: "/space/Setting",
        label: "设置",
      },
      {
        url: "/space/Profile",
        label: "个人资料",
      },
    ];
  };

  static chart_menu_configs = (): ChartStyle[] => {
    return [
      {
        name: "折线图",
        values: [
          { url: "/line/BasicLineChart", label: "基础折线图", rules: { x: [1], y: [1] } },
          { url: "/line/BasicAreaChart", label: "基础面积图", rules: { x: [1], y: [1] } },
          { url: "/line/StackedLineChart", label: "堆叠折线图" },
          { url: "/line/StackedAreaChart", label: "堆叠面积图" },
        ],
      },
      {
        name: "柱状图",
        values: [{ url: "/bar/BasicBarChart", label: "基础柱状图" }],
      },
      {
        name: "饼状图",
        values: [
          { url: "/pie/BasicPieChart", label: "基础饼图" },
          { url: "/pie/DoughnutChart", label: "甜甜圈图" },
          { url: "/pie/RoseChart", label: "玫瑰图" },
        ],
      },
      {
        name: "散点图",
        values: [{ url: "/scatter/BasicScatterChart", label: "基础散点图" }],
      },
      { name: "雷达图", values: [{ url: "/radar/BasicRadarChart", label: "基础雷达图" }] },
      {
        name: "热力图",
        values: [
          {
            url: "/heatmap/CalendarHeatmapChart",
            label: "日历热力图",
          },
        ],
      },
      {
        name: "关系图",
        values: [{ url: "/graph/BasicGraphChart", label: "基础关系图" }],
      },
      {
        name: "树状图",
        values: [
          { url: "/tree/l2rTreeChart", label: "从左到右树" },
          { url: "/tree/r2lTreeChart", label: "从右到左树" },
          { url: "/tree/t2bTreeChart", label: "从上到下树" },
          { url: "/tree/b2tTreeChart", label: "从下到上树" },
          { url: "/tree/PolylineTreeChart", label: "折线树图" },
          { url: "/tree/RadialTreeChart", label: "径向树图" },
        ],
      },
      {
        name: "平行图",
        values: [
          {
            url: "/parallel/BasicParallelChart",
            label: "基础平行坐标图",
          },
          {
            url: "/parallel/AqiParallelChart",
            label: "AQI 平行坐标图",
          },
        ],
      },
      {
        name: "桑吉图",
        values: [
          {
            url: "/sankey/BasicSankeyChart",
            label: "基础桑吉图",
          },
        ],
      },
      {
        name: "漏斗图",
        values: [{ url: "/funnel/BasicFunnelChart", label: "基础漏斗图" }],
      },
      { name: "河流图", values: [{ url: "/river/BasicRiverChart", label: "基础河流图" }] },
      {
        name: "词云图",
        values: [
          {
            url: "/wordcloud/BasicWordCloudChart",
            label: "基础词云图",
          },
          {
            url: "/wordcloud/CustomizeWordCloudChart",
            label: "自定义词云图",
          },
        ],
      },
      {
        name: "地图",
        values: [{ url: "/map/BasicWorldMapChart", label: "基础世界地图" }],
      },
      {
        name: "极坐标图",
        values: [{ url: "/polar/RadialPolarBarChart", label: "极坐标柱图" }],
      },
    ];
  };
  static chart_menu_configs_array = (): MenuItem[] => {
    return menu
      .chart_menu_configs()
      .map((item) => {
        return item.values;
      })
      .flat();
  };
}

export { menu };
