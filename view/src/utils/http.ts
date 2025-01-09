import axios, { AxiosInstance } from "axios";
import { ElLoading } from "element-plus";
import { logger } from "./logger";

interface Response {
  code: number;
  message: string;
  data: { [key: string]: any }[] | { [key: string]: any };
}

let http: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});
let loading_el = undefined;
http.interceptors.request.use(
  (config) => {
    // let token = XXX  // 获取token 进行验证
    // //定义请求或响应中媒体类型的信息
    // setting.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 在发送请求之前做些什么
    // console.log('request', setting)
    loading_el = ElLoading.service({ fullscreen: true, text: "加载中..." });
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    // console.log('requesterror', error)
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // console.log('response', response)
    loading_el.close();
    const { status, data = {}, config = {} } = response;
    return Promise.resolve(response.data);
  },
  (error) => {
    // 对响应错误做点什么
    loading_el.close();
    const { status, data = {}, config = {} } = error.response;
    switch (status) {
      case 400:
        break;
      default:
        break;
    }
    // console.log('responseerror', error)
    return Promise.reject(error);
  }
);

//封装一个get请求
const getHttp = (url, params): Promise<Response> => {
  return http.get(url, {
    params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//封装一个post请求
const postHttp = (url, data): Promise<Response> => {
  logger.debug("[postHttp]", "请求路径", url, "参数", JSON.stringify(data));
  return http.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
// 封装上传文件post请求
const uploadHttp = (url, data): Promise<Response> => {
  return http.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 封装查询数据的post请求
const chartHttp = (data): Promise<Response> => {
  data.token = sessionStorage.getItem("token");
  logger.debug("[chartHttp]", "参数", JSON.stringify(data));

  return http.post("/api/chart_getdata", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { postHttp as $post, uploadHttp as $upload, chartHttp as $chart };
