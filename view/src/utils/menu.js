export const menu_configs = {
  我的空间: [
    {
      url: "/space/Projects",
      label: "我的项目",
      style: "space",
    },
    {
      url: "/space/Datafiles",
      label: "我的数据",
      style: "space",
    },
    {
      url: "/space/Charts",
      label: "我的图表",
      style: "space",
    },
    {
      url: "/space/Setting",
      label: "设置",
      style: "space",
    },
    {
      url: "/space/Profile",
      label: "个人资料",
      style: "space",
    },
  ],
  折线图: [
    { url: "/line/BasicLineChart", label: "基础折线图", style: "chart" },
    { url: "/line/BasicAreaChart", label: "基础面积图", style: "chart" },
    { url: "/line/MultiLinesChart", label: "多折线图", style: "chart" },
    { url: "/line/StackedAreaChart", label: "堆叠面积图", style: "chart" },
    {
      url: "/line/GradientStackedAreaChart",
      label: "渐变堆叠面积图",
      style: "chart",
    },
    { url: "/line/BumpChart", label: "凹凸图", style: "chart" },
    { url: "/line/TemperatureChangeChart", label: "气温变化", style: "chart" },
    { url: "/line/AreaPiecesChart", label: "折线图高亮面积图", style: "chart" },
    { url: "/line/GradientLineChart", label: "渐变折线图", style: "chart" },
    {
      url: "/line/DistributionOfElectricityChart",
      label: "用电量分布图",
      style: "chart",
    },
    {
      url: "/line/RainfallAndEvaporationChart",
      label: "降雨量和蒸发量",
      style: "chart",
    },
    {
      url: "/line/RainfallAndFlowChart",
      label: "降雨量和流量",
      style: "chart",
    },
    { url: "/line/BeijingAQIChart", label: "Beijing AQI", style: "chart" },
  ],
  柱状图: [
    { url: "/bar/BasicBarChart", label: "基础柱状图", style: "chart" },
    { url: "/bar/BgcolorBarChart", label: "柱状图背景色", style: "chart" },
    { url: "/bar/BarColorBarChart", label: "柱状图颜色", style: "chart" },
    { url: "/bar/WaterfallChart", label: "瀑布图", style: "chart" },
    {
      url: "/bar/NegativeValueBarChart",
      label: "正负值柱状图",
      style: "chart",
    },
    {
      url: "/bar/NegativeValueHorizontalBarChart",
      label: "正负值多系列条形图",
      style: "chart",
    },
    {
      url: "/bar/WorldPopulationBarChart",
      label: "世界人口条状图",
      style: "chart",
    },
    { url: "/bar/LabelBarChart", label: "柱状图标签", style: "chart" },
    { url: "/bar/StackedColumnChart", label: "堆叠柱状图", style: "chart" },
    {
      url: "/bar/StackedHorizontalBarChart",
      label: "堆叠条形图",
      style: "chart",
    },
    { url: "/bar/MultipleYBarChart", label: "双Y轴折柱混合图", style: "chart" },
  ],

  饼状图: [
    { url: "/pie/BasicPieChart", label: "基础饼图", style: "chart" },
    { url: "/pie/RoundedCornerPieChart", label: "圆角饼图", style: "chart" },
    { url: "/pie/DoughnutChart", label: "甜甜圈图", style: "chart" },
    { url: "/pie/HalfDoughnutChart", label: "半环图", style: "chart" },
    { url: "/pie/RoseChart", label: "玫瑰图", style: "chart" },
  ],
  散点图: [
    { url: "/scatter/BasicScatterChart", label: "基础散点图", style: "chart" },
    {
      url: "/scatter/AnscombeQuartetChart",
      label: "安斯科目四重奏",
      style: "chart",
    },
    {
      url: "/scatter/ClusterScatterChart",
      label: "聚类散点图",
      style: "chart",
    },
    {
      url: "/scatter/PunchCardScatterChart",
      label: "打卡散点图",
      style: "chart",
    },
    {
      url: "/scatter/SingleAxisScatterChart",
      label: "单轴散点图",
      style: "chart",
    },
    {
      url: "/scatter/LabelRightScatterChart",
      label: "标签右对齐散点图",
      style: "chart",
    },
    {
      url: "/scatter/LabelTopScatterChart",
      label: "标签顶对齐散点图",
      style: "chart",
    },
  ],
  雷达图: [
    { url: "/radar/BasicRadarChart", label: "基础雷达图", style: "chart" },
  ],
  热力图: [
    {
      url: "/heatmap/CalendarHeatmapChart",
      label: "日历热力图",
      style: "chart",
    },
  ],
  关系图: [
    { url: "/graph/SimpleGraphChart", label: "基础关系图", style: "chart" },
    {
      url: "/graph/CartesianGraphChart",
      label: "笛卡尔坐标关系图",
      style: "chart",
    },
    {
      url: "/graph/ForceLayoutGraphChart",
      label: "力布局关系图",
      style: "chart",
    },
    {
      url: "/graph/CircleLayoutGraphChart",
      label: "圆布局关系图",
      style: "chart",
    },
  ],
  树状图: [
    { url: "/tree/l2rTreeChart", label: "从左到右树", style: "chart" },
    { url: "/tree/r2lTreeChart", label: "从右到左树", style: "chart" },
    { url: "/tree/t2bTreeChart", label: "从上到下树", style: "chart" },
    { url: "/tree/b2tTreeChart", label: "从下到上树", style: "chart" },
    { url: "/tree/PolylineTreeChart", label: "折线树图", style: "chart" },
    { url: "/tree/RadialTreeChart", label: "径向树图", style: "chart" },
  ],
  平行图: [
    {
      url: "/parallel/SimpleParallelChart",
      label: "基础平行坐标图",
      style: "chart",
    },
    {
      url: "/parallel/AqiParallelChart",
      label: "AQI 平行坐标图",
      style: "chart",
    },
  ],
  桑吉图: [
    {
      url: "/sankey/SimpleSankeyChart",
      label: "基础桑吉图",
      style: "chart",
    },
    {
      url: "/sankey/GradientSankeyChart",
      label: "桑吉图渐变色",
      style: "chart",
    },
    {
      url: "/sankey/LabelLeftSankeyChart",
      label: "桑吉图标签左对齐",
      style: "chart",
    },
  ],
  漏斗图: [
    { url: "/funnel/SimpleFunnelChart", label: "基础漏斗图", style: "chart" },
    {
      url: "/funnel/CustomizeFunnelChart",
      label: "订制漏斗图",
      style: "chart",
    },
    { url: "/funnel/CompareFunnelChart", label: "对比漏斗图", style: "chart" },
    { url: "/funnel/MultipleFunnelChart", label: "多个漏斗图", style: "chart" },
  ],
  河流图: [
    { url: "/river/SimpleRiverChart", label: "基础河流图", style: "chart" },
  ],
  词云图: [
    {
      url: "/wordcloud/BasicWordCloudChart",
      label: "基础词云图",
      style: "chart",
    },
    {
      url: "/wordcloud/CustomizeWordCloudChart",
      label: "自定义词云图",
      style: "chart",
    },
  ],
  地图: [
    { url: "/map/SimpleWorldMapChart", label: "基础世界地图", style: "chart" },
  ],
  极坐标图: [
    { url: "/polar/RadialPolarBarChart", label: "极坐标柱图", style: "chart" },
    {
      url: "/polar/RadialPolarStackedBarChart",
      label: "极坐标堆叠图",
      style: "chart",
    },
  ],
};
