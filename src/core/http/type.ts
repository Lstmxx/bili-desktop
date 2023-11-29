import { type DOMAIN_ENUM } from './constant';
import type { FetchOptions, Response } from '@tauri-apps/api/http';

export type IRequestConfig = Omit<FetchOptions, 'method'> & {
  url: string
  method?: FetchOptions['method']
  data?: any
  params?: any
  /**
	 * 主域
	 */
  server?: DOMAIN_ENUM
  /**
	 * 强制不取消请求
	 */
  isNotCancel?: boolean
  /**
	 * 缓存请求 cancelToken 的key
	 */
  cacheRequestKey?: string
  /**
	 * 取消重复url 请求（不包含参数）
	 */
  isCancelDuplicateUrlRequests?: boolean
};

export interface IRequestInterceptor {
  fulfilled?: (requestConfig: IRequestConfig) => Promise<IRequestConfig> | IRequestConfig
  rejected?: (error: any) => Promise<any>
}

export interface IResponseInterceptor {
  fulfilled?: (response: Response<any>) => Promise<Response<any>>
  rejected?: (error: any) => Promise<any>
}

/*
 * 自定义拦截器对象类型
 * */
export interface IInterceptor {
  request?: IRequestInterceptor[]
  response?: IResponseInterceptor[]
}

export interface IHttpConfig {
  interceptors?: IInterceptor
  defaultConfig?: IRequestConfig
}

export interface IResponse<T> {
  data: T
  code: number
  message: string
}
