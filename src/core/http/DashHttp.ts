import { useLoadingStore } from '@/store/loading';
import type { IHttpConfig, IRequestConfig, IRequestInterceptor, IResponseInterceptor } from './type';

import { fetch, ResponseType, type Response } from '@tauri-apps/api/http';

export default class DashHttp {
  private readonly requestDefaultConfig: IRequestConfig = {
    url: '',
    responseType: ResponseType.Binary,
    isCancelDuplicateUrlRequests: false,
    isNotCancel: false
  };

  private readonly requestInterceptors: IRequestInterceptor[] = [];
  private readonly responseInterceptors: IResponseInterceptor[] = [];

  constructor ({ interceptors, defaultConfig }: IHttpConfig) {
    if (defaultConfig) {
      this.requestDefaultConfig = Object.assign({}, this.requestDefaultConfig, defaultConfig);
    }
    if (interceptors) {
      const { request = [], response = [] } = interceptors;
      this.requestInterceptors = request;
      this.responseInterceptors = response;
    }
  }

  async get (requestConfig: IRequestConfig): Promise<BinaryData> {
    const res = await this.request(Object.assign({ method: 'GET' }, requestConfig));
    return res.data;
  }

  async post (requestConfig: IRequestConfig): Promise<BinaryData> {
    const res = await this.request(Object.assign({ method: 'GET' }, requestConfig));
    return res.data;
  }

  async put (requestConfig: IRequestConfig): Promise<BinaryData> {
    const res = await this.request(Object.assign({ method: 'GET' }, requestConfig));
    return res.data;
  }

  async delete (requestConfig: IRequestConfig): Promise<BinaryData> {
    const res = await this.request(Object.assign({ method: 'GET' }, requestConfig));
    return res.data;
  }

  async runInterceptors<T = any>(interceptors: IRequestInterceptor[] | IResponseInterceptor[], defaultVal: T) {
    let promise = new Promise<T>((resolve) => {
      resolve(defaultVal);
    });
    const defaultResolve = (val: T) => val;
    interceptors.forEach((interceptor) => {
      const { rejected, fulfilled } = interceptor;
      promise = promise.then((fulfilled?.bind(interceptor) as any) ?? defaultResolve, rejected?.bind(interceptor));
    });
    return await promise;
  }

  async request ({ method = 'GET', ...requestConfig }: IRequestConfig): Promise<Response<BinaryData>> {
    let mergeConfig = Object.assign(
      {},
      {
        ...this.requestDefaultConfig,
        ...requestConfig,
        method
      }
    );

    mergeConfig = Object.assign(
      mergeConfig,
      await this.runInterceptors<IRequestConfig>(this.requestInterceptors, mergeConfig)
    );

    if (mergeConfig.loading) {
      useLoadingStore.getState().setLoading(true);
    }
    // if (method === 'GET' || method === 'DELETE') {
    // }
    let res: Response<BinaryData>;
    try {
      res = await fetch<BinaryData>(mergeConfig.url, {
        method,
        headers: mergeConfig.headers,
        responseType: mergeConfig.responseType
      });
      res = await this.runInterceptors<Response<BinaryData>>(this.responseInterceptors, res);
    } finally {
      if (mergeConfig.loading) {
        useLoadingStore.getState().setLoading(false);
      }
    }

    return res;
  }
}
