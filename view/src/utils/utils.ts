import { $post } from "./http";

class utils {
  static StorageKeys = {
    activeProjectId: "activeProjectId",
    token: "token",
  };
  static uid = () => {
    return new Date().getTime() + Math.random().toString(32).slice(2, 10);
  };
  static setLocalItem = async (data: { [key: string]: string }) => {
    const user_id = sessionStorage.getItem("token");
    console.log("[setLocalItem]", "参数", user_id, data);
    await $post("/api/setting/set", {
      user_id,
      data,
    });
  };
  static getLocalItem = async (key): Promise<string> => {
    console.log("[getLocalItem]", "参数", key);
    const resp = await $post("/api/setting/get", {
      user_id: sessionStorage.getItem("token"),
      key: key,
    });
    if (resp.code === 200) {
      if (typeof resp.data === "object" && resp.data !== null && "value" in resp.data) {
        return resp.data.value;
      } else {
        logger.error("[getLocalItem]", "响应数据格式不正确", resp.data);
        return "";
      }
    }
    return "";
  };
  static assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
  }
  static empty = (e) => {
    switch (e) {
      case "":
      case 0:
      case "0":
      case null:
      case false:
      case undefined:
        return true;
      default:
        return false;
    }
  };
  static zip = (...arrays) => {
    return arrays[0]
      .map((_, i) => {
        return arrays.map((array) => array[i]);
      })
      .slice(0, Math.min(...arrays.map((arr) => arr.length)));
  };
  static getType = (val) => {
    return Object.prototype.toString.call(val).slice(8, -1);
  };
  static titleTextStyleFontFamilies = [
    { label: "宋体", value: "SimSun" },
    { label: "黑体", value: "SimHei" },
    { label: "微软雅黑", value: "Microsoft Yahei" },
    { label: "微软正黑体", value: "Microsoft JhengHei" },
    { label: "楷体", value: "KaiTi" },
    { label: "新宋体", value: "NSimSun" },
    { label: "仿宋", value: "FangSong" },
    { label: "苹方", value: "PingFang SC" },
    { label: "华文黑体", value: "STHeiti" },
    { label: "华文楷体", value: "STKaiti" },
    { label: "华文宋体", value: "STSong" },
    { label: "华文仿宋", value: "STFangsong" },
    { label: "华文中宋", value: "STZhongsong" },
    { label: "华文琥珀", value: "STHupo" },
    { label: "华文新魏", value: "STXinwei" },
    { label: "华文隶书", value: "STLiti" },
    { label: "华文行楷", value: "STXingkai" },
    { label: "冬青黑体简", value: "Hiragino Sans GB" },
    { label: "兰亭黑-简", value: "Lantinghei SC" },
    { label: "翩翩体-简", value: "Hanzipen SC" },
    { label: "手札体-简", value: "Hannotate SC" },
    { label: "宋体-简", value: "Songti SC" },
    { label: "娃娃体-简", value: "Wawati SC" },
    { label: "魏碑-简", value: "Weibei SC" },
    { label: "行楷-简", value: "Xingkai SC" },
    { label: "雅痞-简", value: "Yapi SC" },
    { label: "圆体-简", value: "Yuanti SC" },
    { label: "幼圆", value: "YouYuan" },
    { label: "隶书", value: "LiSu" },
    { label: "华文细黑", value: "STXihei" },
    { label: "华文楷体", value: "STKaiti" },
    { label: "华文宋体", value: "STSong" },
    { label: "华文仿宋", value: "STFangsong" },
    { label: "华文中宋", value: "STZhongsong" },
    { label: "华文彩云", value: "STCaiyun" },
    { label: "华文琥珀", value: "STHupo" },
    { label: "华文新魏", value: "STXinwei" },
    { label: "华文隶书", value: "STLiti" },
    { label: "华文行楷", value: "STXingkai" },
    { label: "方正舒体", value: "FZShuTi" },
    { label: "方正姚体", value: "FZYaoti" },
    { label: "思源黑体", value: "Source Han Sans CN" },
    { label: "思源宋体", value: "Source Han Serif SC" },
    { label: "文泉驿微米黑", value: "WenQuanYi Micro Hei" },
  ];
  static titleXAxisNameLocations = [
    { label: "start", value: "start" },
    { label: "center", value: "center" },
    { label: "end", value: "end" },
  ];
  static xAxisNameLocations = [
    { label: "左侧", value: "start" },
    { label: "中间", value: "center" },
    { label: "右侧", value: "end" },
  ];
  static yAxisNameLocations = [
    { label: "底部", value: "start" },
    { label: "中间", value: "center" },
    { label: "顶部", value: "end" },
  ];
  static seriesSymbols = [
    { label: "circle", value: "circle" },
    { label: "rect", value: "rect" },
    { label: "roundRect", value: "roundRect" },
    { label: "triangle", value: "triangle" },
    { label: "diamond", value: "diamond" },
    { label: "pin", value: "pin" },
    { label: "arrow", value: "arrow" },
    { label: "none", value: "none" },
  ];
  static seriesLineStyleTypes = [
    { label: "solid", value: "solid" },
    { label: "dashed", value: "dashed" },
    { label: "dotted", value: "dotted" },
  ];
  static seriesBarItemStyleBorderTypes = [
    { label: "solid", value: "solid" },
    { label: "dashed", value: "dashed" },
    { label: "dotted", value: "dotted" },
  ];
  static echartOptionColor = [
    { label: "#5470c6", value: "#5470c6" },
    { label: "#91cc75", value: "#91cc75" },
    { label: "#fac858", value: "#fac858" },
    { label: "#ee6666", value: "#ee6666" },
    { label: "#73c0de", value: "#73c0de" },
    { label: "#3ba272", value: "#3ba272" },
    { label: "#fc8452", value: "#fc8452" },
    { label: "#9a60b4", value: "#9a60b4" },
    { label: "#ea7ccc", value: "#ea7ccc" },
  ];
  static echartOptionGradientColor = [
    { label: "温暖的火焰", value: "#ff9a9e,#fad0c4" },
    { label: "褪色的夕阳", value: "#a18cd1,#fbc2eb" },
    { label: "春天的温暖", value: "#fad0c4,#fad0c4" },
    { label: "美味的水蜜桃", value: "#ffecd2,#fcb69f" },
    { label: "年轻的激情", value: "#ff8177,#b12a5b" },
    { label: "女士的嘴唇", value: "#ff9a9e,#fecfef" },
    { label: "阳光明媚的早晨", value: "#f6d365,#fda085" },
    { label: "夕阳下的雨", value: "#fbc2eb,#a6c1ee" },
    { label: "梦想被冷冻", value: "#fdcbf1,#e6dee9" },
    { label: "冬季的哈尔滨湖", value: "#a1c4fd,#c2e9fb" },
    { label: "尘埃的草", value: "#d4fc79,#96e6a1" },
    { label: "诱人的蔚蓝", value: "#84fab0,#8fd3f4" },
    { label: "大雨滂沱", value: "#cfd9df,#e2ebf0" },
    { label: "我心爱的人", value: "#a6c0fe,#f68084" },
    { label: "结出的果实", value: "#fccb90,#d57eeb" },
    { label: "深蓝色", value: "#e0c3fc,#8ec5fc" },
    { label: "成熟的女性", value: "#f093fb,#f5576c" },
    { label: "多云的深圳", value: "#fdfbfb,#ebedee" },
    { label: "三亚的海滩", value: "#4facfe,#00f2fe" },
    { label: "新的生活", value: "#43e97b,#38f9d7" },
    { label: "已是近黄昏", value: "#fa709a,#fee140" },
    { label: "入睡的简室", value: "#30cfd0,#330867" },
    { label: "罕见的风力", value: "#a8edea,#fed6e3" },
    { label: "近水楼台先得月", value: "#5ee7df,#b490ca" },
    { label: "野外的苹果", value: "#d299c2,#fef9d7" },
    { label: "上海的外滩", value: "#f5f7fa,#c3cfe2" },
    { label: "厦门的微笑", value: "#16d9e3,#46aef7" },
    { label: "紫色的盘子", value: "#667eea,#764ba2" },
    { label: "基业长青的天空", value: "#fdfcfb,#e2d1c3" },
    { label: "快乐的渔夫", value: "#89f7fe,#66a6ff" },
    { label: "对你的祝福", value: "#fddb92,#d1fdff" },
    { label: "鹰的漂亮眼睛", value: "#9890e3,#b1f4cf" },
    { label: "九寨沟的湖底", value: "#ebc0fd,#d9ded8" },
    { label: "熟还是不熟的柠檬", value: "#96fbc4,#f9f586" },
    { label: "天地相接", value: "#2af598,#009efd" },
    { label: "李白的奇迹", value: "#cd9cf2,#f6f3ff" },
    { label: "旧式的", value: "#e4afcb,#7edbdc" },
    { label: "高级葡萄酒", value: "#b8cbb8,#ee609c" },
    { label: "深蓝的海", value: "#6a11cb,#2575fc" },
    { label: "酸酸甜甜就是我", value: "#37ecba,#72afd3" },
    { label: "悲伤的松树", value: "#ebbba7,#cfc7f8" },
    { label: "青岛的美美哒", value: "#fff1eb,#ace0f9" },
    { label: "害羞的彩虹", value: "#eea2a2,#7ac5d8" },
    { label: "很多的希望", value: "#c471f5,#fa71cd" },
    { label: "我要飞的更高", value: "#48c6ef,#6f86d6" },
    { label: "强烈的幸福来袭", value: "#f78ca0,#fe9a8b" },
    { label: "未成熟的果实", value: "#feada6,#f5efef" },
    { label: "北方大雪纷飞", value: "#e6e9f0,#eef1f5" },
    { label: "淡淡的水墨丹青", value: "#accbee,#e7f0fd" },
    { label: "仁慈而又坚强", value: "#e9defa,#fbfcdb" },
    { label: "柔软的小嫩草", value: "#c1dfc4,#deecdd" },
    { label: "浓郁的树叶", value: "#0ba360,#3cba92" },
    { label: "百度的蓝色", value: "#00c6fb,#005bea" },
    { label: "阴凉的水", value: "#74ebd5,#9face6" },
    { label: "这个妆画的挫", value: "#6a85b6,#bac8e0" },
    { label: "大鲸鱼", value: "#a3bded,#6991c7" },
    { label: "少年的笔记", value: "#9795f0,#fbc8d4" },
    { label: "善意的谎言", value: "#a7a6cb,#8989ba" },
    { label: "甜蜜时期", value: "#3f51b1,#f7c978" },
    { label: "火烧的寂寞", value: "#fcc5e4,#020f75" },
    { label: "温和的爱护", value: "#dbdcd7,#1c1a27" },
    { label: "红色的拯救", value: "#f43b47,#453a94" },
    { label: "燃烧的春天", value: "#4fb576,#432c39" },
    { label: "晚会之夜", value: "#0250c5,#d43f8d" },
    { label: "天空翱翔", value: "#88d3ce,#6e45e2" },
    { label: "美好的未来", value: "#d9afd9,#97d9e1" },
    { label: "贵族的人物", value: "#7028e4,#e5b2ca" },
    { label: "水珠飞溅", value: "#13547a,#80d0c7" },
    { label: "上面的云", value: "#BDBBBE,#9D9EA3" },
    { label: "灰色的照片", value: "#505285,#b5aee4" },
    { label: "爱的吻", value: "#ff0844,#ffb199" },
    { label: "干净的镜子", value: "#93a5cf,#e4efe9" },
    { label: "高级而神秘的黑", value: "#434343,#000000" },
    { label: "寒冷的夜晚", value: "#0c3483,#a2b6df" },
    { label: "纳木措看海", value: "#93a5cf,#e4efe9" },
    { label: "活力的夏季运动", value: "#92fe9d,#00c9ff" },
    { label: "床上的激情", value: "#ff758c,#ff7eb3" },
    { label: "山上的大岩石", value: "#868f96,#596164" },
    { label: "沙漠的小丘", value: "#c79081,#dfa579" },
    { label: "丛林的天空", value: "#8baaaa,#ae8b9c" },
    { label: "浴火凤凰", value: "#f83600,#f9d423" },
    { label: "活力而又成熟", value: "#b721ff,#21d4fd" },
    { label: "遥远的河流", value: "#6e45e2,#88d3ce" },
    { label: "丛林游戏", value: "#d558c8,#24d292" },
    { label: "丛林刚升起的太阳", value: "#abecd6,#fbed96" },
    { label: "高级白色", value: "#d5d4d0,#e9e9e7" },
    { label: "火星派对", value: "#5f72bd,#9b23ea" },
    { label: "永恒的宇宙", value: "#09203f,#537895" },
    { label: "姑娘腮红", value: "#ddd6f3,#faaca8" },
    { label: "有彩虹的雨", value: "#dcb0ed,#99c99c" },
    { label: "阳光下的椰果", value: "#f3e7e9,#e3eeff" },
    { label: "火龙果", value: "#c71d6f,#d09693" },
    { label: "健康的水", value: "#96deda,#50c9c3" },
    { label: "热情爱爱", value: "#f77062,#fe5196" },
    { label: "剥开的荔枝", value: "#c4c5c7,#ebebeb" },
    { label: "另一种青菜", value: "#a8caba,#5d4157" },
    { label: "邪恶的立场", value: "#29323c,#485563" },
    { label: "四川的九寨沟", value: "#16a085,#f4d03f" },
    { label: "快乐的记忆", value: "#ff5858,#f09819" },
    { label: "黑夜的深圳", value: "#2b5876,#4e4376" },
    { label: "薄荷冰爽", value: "#00cdac,#8ddad5" },
    { label: "幸福的晚会", value: "#4481eb,#04befe" },
    { label: "快乐的云", value: "#dad4ec,#f3e7e9" },
    { label: "鸡尾酒", value: "#874da2,#c43a30" },
    { label: "武汉的城市", value: "#4481eb,#04befe" },
    { label: "冷冻的浆果", value: "#e8198b,#c7eafd" },
    { label: "呵护儿童", value: "#f794a4,#fdd6bd" },
    { label: "天与花的相接", value: "#64b3f4,#c2e59c" },
    { label: "酷炫城市", value: "#3b41c5,#ffc8a9" },
    { label: "活力而盛开", value: "#0fd850,#f9f047" },
    { label: "天空有些阴霾", value: "lightgrey,#bcbcbc" },
    { label: "关怀与少女", value: "#ee9ca7,#ffdde1" },
    { label: "深海里的水", value: "#3ab5b0,#56317a" },
    { label: "海滩", value: "#209cff,#68e0cf" },
    { label: "大理石", value: "#bdc2e8,#e6dee9" },
    { label: "佳节快乐", value: "#e6b980,#eacda3" },
    { label: "夜空中最亮的星", value: "#1e3c72,#2a5298" },
    { label: "施了魔法的湖", value: "#d5dee7,#c9ffbf" },
    { label: "老牛吃嫩草", value: "#9be15d,#00e3ae" },
    { label: "五颜六色的桃子", value: "#ed6ea0,#ec8c69" },
    { label: "温柔的呵护", value: "#ffc3a0,#ffafbd" },
    { label: "鲜艳的水果", value: "#cc208e,#6713d2" },
    { label: "快乐而精彩", value: "#b3ffab,#12fff7" },
    { label: "全金属", value: "#D5DEE7,#E2E7ED" },
    { label: "西藏的风景", value: "#65bd60,#fef381" },
    { label: "海底的深洞", value: "#243949,#517fa4" },
    { label: "橙汁么么哒", value: "#fc6076,#ff9a44" },
    { label: "我是一只小绵羊", value: "#dfe9f3,#ffffff" },
    { label: "科技精彩生活", value: "#00dbde,#fc00ff" },
    { label: "水果大杂烩", value: "#f9d423,#ff4e50" },
    { label: "张家界的夏天", value: "#50cc7f,#f5d100" },
    { label: "活力的好心情", value: "#0acffe,#495aff" },
    { label: "旧房子里的光", value: "#616161,#9bc5c3" },
    { label: "空间移位", value: "#3d3393,#35eb93" },
    { label: "房子与天空", value: "#df89b5,#bfd9fe" },
    { label: "皇家园林", value: "#ed6ea0,#ec8c69" },
    { label: "很多金属", value: "#d7d2cc,#304352" },
    { label: "美味的蛋糕", value: "#e14fad,#f9d423" },
    { label: "漂亮的发光", value: "#b224ef,#7579ff" },
    { label: "微光下的沙滩", value: "#c1c161,#d4d4b1" },
    { label: "丽江的美", value: "#ec77ab,#7873f5" },
    { label: "海洋的惊叹", value: "#007adf,#00ecbc" },
    { label: "健康绿色的食物", value: "#20E2D7,#F9FEA5" },
    { label: "海洋与陆地", value: "#2CD8D5,#FFBAC3" },
    { label: "落日的海边", value: "#2CD8D5,#8E37D7" },
    { label: "干净环保", value: "#DFFFCD,#39F3BB" },
    { label: "飞机下降", value: "#5D9FFF,#6BBBFF" },
    { label: "巫妖王", value: "#A8BFFF,#884D80" },
    { label: "不眠之夜", value: "#5271C4,#ECA1FE" },
    { label: "天使降临", value: "#FFE29F,#FF719A" },
    { label: "很深的海", value: "#22E1FF,#625EB1" },
    { label: "是你喜欢的唇膏", value: "#B6CEE8,#F578DC" },
    { label: "基础点", value: "#FFFEFF,#D7FFFE" },
    { label: "化妆品", value: "#E3FDF5,#FFE6FA" },
    { label: "适宜居住", value: "#7DE2FC,#B9B6E5" },
    { label: "冬天啦", value: "#CBBACC,#2580B3" },
    { label: "午餐有水果", value: "#B7F8DB,#50A7C2" },
    { label: "下雨的海", value: "#7085B6,#DEF3F8" },
    { label: "辽宁号母舰", value: "#77FFD2,#1EECFF" },
    { label: "夜里的救援", value: "#AC32E4,#4801FF" },
    { label: "最亮的天空", value: "#D4FFEC,#4596FB" },
    { label: "浅蓝色", value: "#9EFBD3,#45D4FB" },
    { label: "慢慢的思考", value: "#473B7B,#30D2BE" },
    { label: "微光下的薰衣草", value: "#007adf,#00ecbc" },
    { label: "棒棒糖", value: "#A445B2,#FF0066" },
    { label: "美味的甜点", value: "#7742B2,#FD8BD9" },
    { label: "神奇的光线", value: "#FF3CAC,#2B86C5" },
    { label: "幸运而富有", value: "#FF057C,#321575" },
    { label: "冻结的希望", value: "#FF057C,#4CC3FF" },
    { label: "苏州园林的景色", value: "#69EACB,#6654F1" },
    { label: "秋季的黄昏", value: "#231557,#FFF800" },
    { label: "稳重而低调的蓝色", value: "#3D4E81,#6E7FF3" },
    { label: "海滩上的彩虹", value: "#FF007F,#FFFF00" },
    { label: "海滩上的月亮", value: "#FFC312,#006400" },
    { label: "海滩上的星星", value: "#FFC312,#006400" },
  ];
  static echartOptionLabelPositions = [
    { label: "内部", value: "inside" },
    { label: "顶部", value: "top" },
    { label: "左侧", value: "left" },
    { label: "底部", value: "bottom" },
    { label: "右侧", value: "right" },
  ];
}

export { utils };
