import type { IRequestConfig } from '../../type';
import qs from 'qs';

export class ParamsInterceptor {
  addParamsToUrl (url: string, params: any) {
    return `${url}?${qs.stringify(params)}`;
  }

  fulfilled (config: IRequestConfig) {
    if (config.method === 'GET' && config.params) {
      config.url = this.addParamsToUrl(config.url, config.params);
    }
    return config;
  }
}
