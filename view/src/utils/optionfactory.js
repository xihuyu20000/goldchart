import * as echarts from "echarts";
import "echarts-wordcloud";
import ecStat from "echarts-stat";
echarts.registerTransform(ecStat.transform.clustering);
echarts.registerTransform(ecStat.transform.regression);

import * as line from "@/pages/charts/line/index";
import * as bar from "@/pages/charts/bar/index";
import * as pie from "@/pages/charts/pie/index";
import * as scatter from "@/pages/charts/scatter/index";
import * as radar from "@/pages/charts/radar/index";
import * as heatmap from "@/pages/charts/heatmap/index";
import * as graph from "@/pages/charts/graph/index";
import * as tree from "@/pages/charts/tree/index";
import * as parallel from "@/pages/charts/parallel/index";
import * as sankey from "@/pages/charts/sankey/index";
import * as funnel from "@/pages/charts/funnel/index";
import * as river from "@/pages/charts/river/index";
import * as wordcloud from "@/pages/charts/wordcloud/index";
import * as map from "@/pages/charts/map/index";
import * as polar from "@/pages/charts/polar/index";

const chart_types = {
  line,
  bar,
  pie,
  scatter,
  radar,
  heatmap,
  graph,
  tree,
  parallel,
  sankey,
  funnel,
  river,
  wordcloud,
  map,
  polar,
};

export const get_options = (chartid) => {
  /**
   * 在echarts页面中，调用get_options函数，传入chartid
   * @param {string} chartid 图表的id，格式为"chart_style/subchart_name"，如"line/simple"
   * @returns {Promise<Object>} 返回一个Promise对象，resolve为echarts的option对象
   */
  console.log(
    `"文件utils/optionfactory.js 函数get_options 参数chartid 值${chartid}"`
  );
  // 1 去掉开头的"/"
  if (chartid.startsWith("/")) {
    chartid = chartid.slice(1);
  }
  // 2 解析chartid
  let parts = chartid.split("/");
  // 图表类型,如line、bar、pie等
  const chart_style = parts[0];
  // 图表名称,如BasicLineChart等
  const chart_name = parts[1];
  const chart_styles = chart_types[chart_style];
  const getOptionFunc = chart_styles[chart_name];
  // 3 调用图表的getOptionFunc函数，获取图表的option数据
  let dataset = getOptionFunc();

  return dataset;
};
