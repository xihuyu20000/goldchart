import { zip } from "@/utils/utils.js";
export async function BasicWordCloudChart() {
  const resp = await $chart({ chart_id: "/wordcloud/BasicWordCloudChart" });
  let fruits = [
    { name: "互联网服务", value: 1000 },
    { name: "交通运输", value: 850 },
    { name: "公司", value: 800 },
    { name: "军工", value: 600 },
    { name: "医药", value: 900 },
    { name: "商务服务", value: 600 },
    { name: "城乡规划", value: 800 },
    { name: "家政服务", value: 400 },
    { name: "安防", value: 850 },
    { name: "医疗服务", value: 200 },
    { name: "电子科技", value: 8000 },
    { name: "航空航天", value: 1500 },
    { name: "食品饮料", value: 1500 },
    { name: "能源", value: 800 },
    { name: "教育培训", value: 200 },
    { name: "金融", value: 100 },
    { name: "文化娱乐", value: 250 },
    { name: "电力", value: 1200 },
    { name: "石油化工", value: 300 },
    { name: "电子商务", value: 900 },
    { name: "建筑", value: 700 },
    { name: "旅游", value: 550 },
    { name: "环保", value: 750 },
    { name: "地产", value: 1100 },
    { name: "体育", value: 300 },
    { name: "通信", value: 950 },
    { name: "科研", value: 1200 },
    { name: "物流", value: 1300 },
    { name: "咨询", value: 600 },
    { name: "游戏", value: 850 },
    { name: "人力资源", value: 500 },
    { name: "水务", value: 300 },
    { name: "舞蹈艺术", value: 150 },
    { name: "汽车制造", value: 1100 },
    { name: "电影制作", value: 350 },
    { name: "游乐园", value: 250 },
    { name: "新能源", value: 900 },
    { name: "服装设计", value: 400 },
    { name: "采矿", value: 700 },
    { name: "信息安全", value: 800 },
    { name: "化妆品", value: 600 },
    { name: "音乐产业", value: 750 },
    { name: "物联网", value: 1200 },
    { name: "绿色建筑", value: 850 },
    { name: "社交媒体", value: 950 },
    { name: "人工智能", value: 1000 },
    { name: "水产养殖", value: 320 },
    { name: "医学研究", value: 1800 },
    { name: "动物保护", value: 130 },
    { name: "航海", value: 1000 },
  ];

  const option = {
    title: [
      {
        show: true,
        text: "基本词云",
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
      show: true,
    },

    grid: [
      {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "5%",
        containLabel: true,
      },
    ],

    series: [
      {
        type: "wordCloud", // 注意大小写
        gridSize: 8, // 控制词云图的网格大小，值越大词语之间的间距越大
        sizeRange: [10, 80], // 控制词语的大小范围
        rotationRange: [0, 0], // 控制词语的旋转角度范围
        rotationStep: 45, // 控制词语旋转的步长
        shape: "circle", // 控制词云图的形状，可选值为 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        drawOutOfBound: false, // 控制词云图是否允许词语超出绘制区域
        // 布局的时候是否有动画
        layoutAnimation: true,
        // 图的位置
        left: "center",
        top: "center",
        textStyle: {
          fontFamily: "sans-serif",
          // fontWeight: 'bold',
          color: function () {
            return "rgb(" + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(",") + ")";
          },
        },
        data: fruits,
        emphasis: {
          focus: "self",
          textStyle: {
            fontSize: 20, // 点击的词放大
          },
        },
      },
    ],
  };

  let zipped = zip(resp.data.index, resp.data.values).map((row) => {
    const obj = {};
    obj["name"] = row[0];
    obj["value"] = row[1];
    return obj;
  });

  option.series[0].data = zipped;
  return option;
}
