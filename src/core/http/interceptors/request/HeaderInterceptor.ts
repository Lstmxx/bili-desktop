import type { IRequestConfig } from '../../type';

export class HeaderInterceptor {
  async fulfilled (config: IRequestConfig) {
    const { headers = {} } = config;
    headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54';
    headers.Referer = 'https://www.bilibili.com';
    headers.Origin = 'https://www.bilibili.com';
    console.log(headers);
    config.headers = headers;
    return config;
  }
}
