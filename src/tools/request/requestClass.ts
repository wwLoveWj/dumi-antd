// import collectError from '@/utils/collectError';
import { notification } from 'antd';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { collectError, getCookie, guid } from 'magical-antd-ui/utils';

const codeMessage = {
  0: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
notification.config({
  maxCount: 1,
});
export interface DevopsInterceptors<T = AxiosResponse> {
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (error: any) => any;
  responseInterceptors?: (res: T) => T;
  responseInterceptorsCatch?: (error: any) => any;
}

export interface DevopsRequestConfig extends AxiosRequestConfig {
  interceptors?: DevopsInterceptors;
  whiteList?: string[]; // 不展示错误提示信息的接口白名单
  maxCancelNum?: number;
  /** 在单个接口请求中配置，如果设置为true，则此接口不会被clearRequestAll统一取消 */
  noCancel?: boolean;
  requestType?: string;
}

// 接口返回的数据类型
export interface ApiResponse {
  code?: string | number;
  data?: any;
  message?: string;
}

const defaultConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8;', // 统一json返回
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 60000, // 默认超时1分钟
  withCredentials: true,
};

class DevopsRequest {
  instance: AxiosInstance;
  interceptors?: DevopsInterceptors;
  private axiosCancels: Canceler[] = [];
  /** 取消所有请求的函数，按需使用 */
  clearRequestAll = async () => {
    this.axiosCancels.forEach((cancel) => {
      if (cancel) cancel();
    });
    // 移除所有记录
    this.axiosCancels.splice(0);
  };
  constructor(config: DevopsRequestConfig) {
    this.swRequest = this.swRequest.bind(this);
    this.instance = axios.create({ ...defaultConfig, ...config });
    this.interceptors = config.interceptors;
    const maxCancelNum = config.maxCancelNum || 10; // 最大存cancelToken条数
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch,
    );

    this.instance.interceptors.request.use(
      (conf: InternalAxiosRequestConfig<any> & { noCancel?: boolean }) => {
        if (conf.headers) {
          // 某些接口token信息需放在header上 如不需要 请注释
          const token = getCookie('jwt');
          conf.headers.Authorization = 'bearer ' + token;
          // 接口均添加traceId
          conf.headers['devops-traceId'] = guid();
        }
        if (!conf.noCancel) {
          if (this.axiosCancels.length >= maxCancelNum) {
            this.axiosCancels.shift();
          }
          conf.cancelToken = new axios.CancelToken((cancel) => {
            this.axiosCancels.push(cancel);
          });
        }

        return conf;
      },
      (err) => {
        console.log('DevopsRequest类的拦截器请求失败拦截器');
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        // 下载文件流 返回全量response
        if (response.request.responseType === 'blob') {
          return response;
        }
        const data = response.data;
        // 异常统一提示开启  code = 0 表示请求正常
        // 接口返回的数据code不等于0时展示错误信息  无需展示的接口可添加到白名单 whiteList
        if (
          !(parseInt(data.code) === 0 || parseInt(data.code) === 200) &&
          !config.whiteList?.includes(response.config.url as string)
        ) {
          notification.error({
            message: '错误提示',
            description: data.msg || data.message,
          });
          // 请求错误时统一返回格式reject response，页面上需要对错误进一步处理时用catch捕获response
          return Promise.reject(response);
        }
        return data;
      },
      (error) => {
        const response = error.response;
        if (!response) return Promise.reject(error);
        const status = response.status;
        // 鉴权失败
        if (status === 401) {
          notification.error({
            message: '当前用户未登录，请前往登录页重新登录',
          });
          // 跳转到登录页
          //   toLoginPage();
        }

        if (status === 403) {
          notification.error({
            message: response.status,
            description: '无权操作',
          });
        }
        if (status === 406) {
          // 在devops中打开时 展示权限引导弹窗
          if (window.__POWERED_BY_QIANKUN__ || window.name === 'DevOps') {
            const messageData = {
              type: 'auth',
              data: error.response.data,
            };
            window.top?.postMessage(messageData, '*');
          } else {
            notification.error({
              message: '无权访问',
            });
          }
        }

        if (axios.isCancel(error)) {
          // 请求未结束前被取消了 抛出的错误类型和其他错误不一样
          return Promise.reject(error);
        }

        if (status <= 504 && status >= 500) {
          notification.error({
            message: status,
            description: response.statusText || '服务器出错了',
          });
        }

        if (status === 404) {
          notification.error({
            message: '404',
            description: '请求未找到！',
          });
        }

        if (![401, 403, 406].includes(status)) {
          // 接口异常上报sentry
          collectError({
            tag: 'api',
            err: error,
            data: {
              url: response?.config?.url,
              method: response?.config?.method || 'GET',
              data: response?.config?.data,
              params: response?.config?.params,
              response: response?.data,
            },
          });
        }
        // 请求非200
        // const errortext =
        //   response.data?.message ||
        //   codeMessage[response.status] ||
        //   response.statusText;
        // 请求错误时统一返回格式reject response，页面上需要对错误进一步处理时用catch捕获response
        return Promise.reject(error);
      },
    );
  }

  request<T>(config: DevopsRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance.interceptors.request.use(
        config.interceptors?.requestInterceptors,
        config.interceptors?.requestInterceptorsCatch,
      );

      this.instance.interceptors.response.use(
        config.interceptors?.responseInterceptors,
        config.interceptors?.responseInterceptorsCatch,
      );

      this.instance
        .request(config)
        .then((res) => {
          // 返回data
          resolve(res?.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * swagger请求
   * 由于request对返回的数据做了处理只返回data
   * 获取api文档传入的泛型T的data属性作为返回类型
   * */
  swRequest<T>(url: string, config?: DevopsRequestConfig) {
    return this.request<T>({ ...config, url }) as Promise<
      T extends ApiResponse ? T['data'] : T
    >;
  }

  get<T>(
    url: string,
    params?: unknown,
    config?: DevopsRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, params, method: 'GET' });
  }

  post<T>(
    url: string,
    params?: unknown,
    config?: DevopsRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, data: params, method: 'POST' });
  }
  put<T>(
    url: string,
    params?: unknown,
    config?: DevopsRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, data: params, method: 'PUT' });
  }
  delete<T>(
    url: string,
    params?: unknown,
    config?: DevopsRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, data: params, method: 'DELETE' });
  }

  patch<T>(
    url: string,
    params?: unknown,
    config?: DevopsRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, url, data: params, method: 'PATCH' });
  }
}

export default DevopsRequest;
