<template>
  <div>
    <vxe-button @click="addEvent">新增</vxe-button>
    <vxe-button @click="reloadEvent">刷新</vxe-button>
    <vxe-button @click="queryEvent">查询</vxe-button>
    <vxe-button @click="batchRemoveEvent">删除</vxe-button>
    <vxe-button status="success" @click="saveEvent">保存</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" @click="removeRow(row)">删除</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup lang="ts">
import { $post, $upload } from "@/utils/http.ts";
import { ElMessage, ElMessageBox } from "element-plus";
import { VxeUI } from "vxe-pc-ui";
import { useRouter } from "vue-router";
const router = useRouter();
// 选中的项目id
const activeProject = reactive({ id: "", name: "" });

// 表格
const gridRef = ref();

// 模拟接口
const findPageList = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const resp = await $post("/api/connect/loadall", {
        user_id: sessionStorage.getItem("token"),
      });
      resolve({
        result: resp.data,
        total: resp.data.length,
      });
    }, 100);
  });
};
// 模拟接口
const deleteApi = (removeRecords) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const resp = await $post("/api/connect/save", {
        removeRecords: JSON.stringify(removeRecords),
      });
      resolve();
    }, 150);
  });
};
// 模拟接口
const saveApi = (removeRecords, insertRecords, updateRecords) => {
  const removeRecord2 = removeRecords.map((item) => {
    delete item._X_ROW_KEY;
    return item;
  });
  const insertRecord2 = insertRecords.map((item) => {
    delete item._X_ROW_KEY;
    return item;
  });
  const updateRecord2 = updateRecords.map((item) => {
    delete item._X_ROW_KEY;
    return item;
  });
  return new Promise((resolve) => {
    setTimeout(async () => {
      const resp = await $post("/api/connect/save", {
        user_id: sessionStorage.getItem("token"),
        removeRecords: JSON.stringify(removeRecord2),
        insertRecords: JSON.stringify(insertRecord2),
        updateRecords: JSON.stringify(updateRecord2),
      });
      resolve();
    }, 200);
  });
};
const typeListEditRender = {
  name: "VxeSelect",
  options: [
    { label: "sqlite", value: "sqlite" },
    { label: "mysql", value: "mysql" },
  ],
};
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  keepSource: true,
  height: 500,
  editConfig: {
    trigger: "click",
    mode: "row",
    showStatus: true,
  },
  pagerConfig: {
    pageSize: 15,
  },

  columns: [
    { type: "checkbox", width: 50 },
    { type: "seq", width: 70 },
    { field: "name", title: "名称", editRender: { name: "input" } },
    { field: "type", title: "类型", editRender: typeListEditRender },
    { field: "params", title: "参数", editRender: { name: "textarea" } },
    { title: "操作", slots: { default: "action" } },
  ],
  proxyConfig: {
    form: true,
    ajax: {
      query: ({}) => {
        // 默认接收 Promise<{ result: [], page: { total: 100 } }>
        return findPageList();
      },
      delete: ({ body }) => {
        // 接收 Promise<any>
        return deleteApi(body.removeRecords);
      },
      save: ({ body }) => {
        // 接收 Promise<any>
        return saveApi(body.removeRecords, body.insertRecords, body.updateRecords);
      },
    },
  },
});
const addEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.insert({}).then(({ row }) => {
      $grid.setEditRow(row);
    });
  }
};

const removeRow = (row) => {
  VxeUI.modal
    .confirm({
      title: "删除提醒",
      content: "请确认要删除该行吗？\n删除之后，点击保存按钮",
    })
    .then((type) => {
      if (type === "confirm") {
        const $grid = gridRef.value;
        if ($grid) {
          $grid.remove(row);
        }
      }
    });
};
const reloadEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("reload");
  }
};
const queryEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("query");
  }
};
const batchRemoveEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("delete");
  }
};

const saveEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.commitProxy("save");
  }
};
</script>

<style lang="less" scoped></style>
