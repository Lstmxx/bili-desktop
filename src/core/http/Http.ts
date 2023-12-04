import type { IHttpConfig, IRequestConfig, IResponse, IRequestInterceptor, IResponseInterceptor } from './type';

import { fetch, ResponseType, type Response } from '@tauri-apps/api/http';

export default class Http {
	private readonly requestDefaultConfig: IRequestConfig = {
		url: '',
		responseType: ResponseType.JSON,
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

	async get<T = any>(requestConfig: IRequestConfig): Promise<IResponse<T>> {
		const res = await this.request<T>(Object.assign({ method: 'GET' }, requestConfig));
		return res.data;
	}

	async post<T = any>(requestConfig: IRequestConfig): Promise<IResponse<T>> {
		const res = await this.request<T>(Object.assign({ method: 'GET' }, requestConfig));
		return res.data;
	}

	async put<T = any>(requestConfig: IRequestConfig): Promise<IResponse<T>> {
		const res = await this.request<T>(Object.assign({ method: 'GET' }, requestConfig));
		return res.data;
	}

	async delete<T = any>(requestConfig: IRequestConfig): Promise<IResponse<T>> {
		const res = await this.request<T>(Object.assign({ method: 'GET' }, requestConfig));
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

	async request<T = any>({ method = 'GET', ...requestConfig }: IRequestConfig): Promise<Response<IResponse<T>>> {
		let mergeConfig = Object.assign(
			{},
			{
				...this.requestDefaultConfig,
				...requestConfig,
				method
			}
		);

		mergeConfig = Object.assign(mergeConfig, await this.runInterceptors<IRequestConfig>(this.requestInterceptors, mergeConfig));

		// if (method === 'GET' || method === 'DELETE') {
		// }
		let res = await fetch<IResponse<T>>(mergeConfig.url, { method, headers: mergeConfig.headers, responseType: mergeConfig.responseType });

		res = await this.runInterceptors<Response<IResponse<T>>>(this.responseInterceptors, res);

		return res;
	}
}
