import { $post } from "@/utils/http";
import { useGlobalStore } from "@/utils/global";
import { Dataset, ResponseState } from "@/utils/types";
import { ElMessage, ElMessageBox } from "element-plus";
const route = useRoute();
const globalStore = useGlobalStore();

export const handleDatasetChange = async (value: string) => {
  if (globalStore.config.dataset_id && globalStore.config.dataset_id.startsWith("dataset")) {
    const resp = await $post("/api/column/loadby", { dataset_id: globalStore.config.dataset_id });
    if (resp.code === 200) {
      const resp_data = resp.data as ResponseState;
      globalStore.config.columns = resp_data.columns;
    }
  }
};
export const handleDragStart = (event: DragEvent) => {
  if (event.target instanceof HTMLElement) {
    const i = event.target.getAttribute("i");
    event.dataTransfer.setData("i", i);
  }
};

// 4-4 加载数据集列表，当改变下拉表时，会对config.dataset_id赋值，引起变化
export const load_datasets = async () => {
  const resp = await $post("/api/dataset/loadall", { user_id: sessionStorage.getItem("token") });
  if (resp.code === 200) {
    globalStore.datasetList = resp.data as Dataset[];
  }
};

export const saveOption = async () => {
  const token = sessionStorage.getItem(utils.StorageKeys.token);
  globalStore.config.user_id = token;
  globalStore.config.chart_id = route.meta.chartid as string;
  console.log("当前ins_id", globalStore.ins_id);
  const resp = await $post("/api/ins/save", { ins_id: globalStore.ins_id, config: globalStore.config, option: globalStore.option });
  if (resp.code === 200) {
    const resp_data = resp.data as ResponseState;
    // 保存成功后，更新ins_id，否则重复保存时，记录会重复
    globalStore.ins_id = resp_data.ins_id;
    ElMessage({
      type: "success",
      message: "保存成功",
    });
  }
};

export const init_global_config = (): void => {
  globalStore.setConfig({
    user_id: "",
    chart_id: "",
    ins_id: "",
    title: "",
    dataset_id: "",
    xCols: [],
    yCols: [],
    columns: [],
    chart_columns: [],
    chart_datas: [],
  });
};
export const init_global_option = (): void => {
  globalStore.setOption({});
};
