import type { IRequestConfig } from '../../type';
import qs from 'qs';

export class ParamsInterceptor {
  fulfilled (config: IRequestConfig) {
    if (config.method === 'GET' && config.params) {
      const { url, params } = config;
      config.url = `${url}?${qs.stringify(params)}`;
    }
    return config;
  }
}
