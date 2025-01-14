import { useGlobalStore } from "@/utils/global";

const globalStore = useGlobalStore();

export const renderChart = () => {
  if (globalStore.myChart) {
    setTimeout(() => {
      globalStore.myChart.setOption(globalStore.option, { notMerge: true });
    }, 100);
  }
};

export const export_image = () => {
  let img = new Image();
  
  img.src = globalStore.myChart.getDataURL({
    type: "png",
    pixelRatio: 1.5, //放大2倍
    backgroundColor: "#fff",
    excludeComponents: ["toolbox"], // 导出时忽略toolbox组件
  });
  img.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");

    let a = document.createElement("a");
    let event = new MouseEvent("click");
    a.download = "图片.png";
    // 将生成的URL设置为a.href属性
    a.href = dataURL;
    // 触发a的单击事件
    a.dispatchEvent(event);
    a.remove();
  };
};
