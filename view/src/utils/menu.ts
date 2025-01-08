import { MenuItem } from "@/utils/types";
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

  static chart_menu_configs = (): {
    [key: string]: MenuItem[];
  } => {
    return {
      折线图: [
        { url: "/line/BasicLineChart", label: "基础折线图" },
        { url: "/line/BasicAreaChart", label: "基础面积图" },
        { url: "/line/MultiLinesChart", label: "多折线图" },
        { url: "/line/StackedAreaChart", label: "堆叠面积图" },
        {
          url: "/line/GradientStackedAreaChart",
          label: "渐变堆叠面积图",
        },
        { url: "/line/BumpChart", label: "凹凸图" },
        { url: "/line/TemperatureChangeChart", label: "气温变化" },
        { url: "/line/AreaPiecesChart", label: "折线图高亮面积图" },
        { url: "/line/GradientLineChart", label: "渐变折线图" },
        {
          url: "/line/DistributionOfElectricityChart",
          label: "用电量分布图",
        },
        {
          url: "/line/RainfallAndEvaporationChart",
          label: "降雨量和蒸发量",
        },
        {
          url: "/line/RainfallAndFlowChart",
          label: "降雨量和流量",
        },
        { url: "/line/BeijingAQIChart", label: "Beijing AQI" },
      ],
      柱状图: [
        { url: "/bar/BasicBarChart", label: "基础柱状图" },
        { url: "/bar/BgcolorBarChart", label: "柱状图背景色" },
        { url: "/bar/BarColorBarChart", label: "柱状图颜色" },
        { url: "/bar/WaterfallChart", label: "瀑布图" },
        {
          url: "/bar/NegativeValueBarChart",
          label: "正负值柱状图",
        },
        {
          url: "/bar/NegativeValueHorizontalBarChart",
          label: "正负值多系列条形图",
        },
        {
          url: "/bar/WorldPopulationBarChart",
          label: "世界人口条状图",
        },
        { url: "/bar/LabelBarChart", label: "柱状图标签" },
        { url: "/bar/StackedColumnChart", label: "堆叠柱状图" },
        {
          url: "/bar/StackedHorizontalBarChart",
          label: "堆叠条形图",
        },
        { url: "/bar/MultipleYBarChart", label: "双Y轴折柱混合图" },
      ],

      饼状图: [
        { url: "/pie/BasicPieChart", label: "基础饼图" },
        { url: "/pie/RoundedCornerPieChart", label: "圆角饼图" },
        { url: "/pie/DoughnutChart", label: "甜甜圈图" },
        { url: "/pie/HalfDoughnutChart", label: "半环图" },
        { url: "/pie/RoseChart", label: "玫瑰图" },
      ],
      散点图: [
        { url: "/scatter/BasicScatterChart", label: "基础散点图" },
        {
          url: "/scatter/AnscombeQuartetChart",
          label: "安斯科目四重奏",
        },
        {
          url: "/scatter/ClusterScatterChart",
          label: "聚类散点图",
        },
        {
          url: "/scatter/PunchCardScatterChart",
          label: "打卡散点图",
        },
        {
          url: "/scatter/SingleAxisScatterChart",
          label: "单轴散点图",
        },
        {
          url: "/scatter/LabelRightScatterChart",
          label: "标签右对齐散点图",
        },
        {
          url: "/scatter/LabelTopScatterChart",
          label: "标签顶对齐散点图",
        },
      ],
      雷达图: [{ url: "/radar/BasicRadarChart", label: "基础雷达图" }],
      热力图: [
        {
          url: "/heatmap/CalendarHeatmapChart",
          label: "日历热力图",
        },
      ],
      关系图: [
        { url: "/graph/SimpleGraphChart", label: "基础关系图" },
        {
          url: "/graph/CartesianGraphChart",
          label: "笛卡尔坐标关系图",
        },
        {
          url: "/graph/ForceLayoutGraphChart",
          label: "力布局关系图",
        },
        {
          url: "/graph/CircleLayoutGraphChart",
          label: "圆布局关系图",
        },
      ],
      树状图: [
        { url: "/tree/l2rTreeChart", label: "从左到右树" },
        { url: "/tree/r2lTreeChart", label: "从右到左树" },
        { url: "/tree/t2bTreeChart", label: "从上到下树" },
        { url: "/tree/b2tTreeChart", label: "从下到上树" },
        { url: "/tree/PolylineTreeChart", label: "折线树图" },
        { url: "/tree/RadialTreeChart", label: "径向树图" },
      ],
      平行图: [
        {
          url: "/parallel/SimpleParallelChart",
          label: "基础平行坐标图",
        },
        {
          url: "/parallel/AqiParallelChart",
          label: "AQI 平行坐标图",
        },
      ],
      桑吉图: [
        {
          url: "/sankey/SimpleSankeyChart",
          label: "基础桑吉图",
        },
        {
          url: "/sankey/GradientSankeyChart",
          label: "桑吉图渐变色",
        },
        {
          url: "/sankey/LabelLeftSankeyChart",
          label: "桑吉图标签左对齐",
        },
      ],
      漏斗图: [
        { url: "/funnel/SimpleFunnelChart", label: "基础漏斗图" },
        {
          url: "/funnel/CustomizeFunnelChart",
          label: "订制漏斗图",
        },
        { url: "/funnel/CompareFunnelChart", label: "对比漏斗图" },
        { url: "/funnel/MultipleFunnelChart", label: "多个漏斗图" },
      ],
      河流图: [{ url: "/river/SimpleRiverChart", label: "基础河流图" }],
      词云图: [
        {
          url: "/wordcloud/BasicWordCloudChart",
          label: "基础词云图",
        },
        {
          url: "/wordcloud/CustomizeWordCloudChart",
          label: "自定义词云图",
        },
      ],
      地图: [{ url: "/map/SimpleWorldMapChart", label: "基础世界地图" }],
      极坐标图: [
        { url: "/polar/RadialPolarBarChart", label: "极坐标柱图" },
        {
          url: "/polar/RadialPolarStackedBarChart",
          label: "极坐标堆叠图",
        },
      ],
    };
  };
}

export { menu };
