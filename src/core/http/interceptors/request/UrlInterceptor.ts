import type { IRequestConfig } from '../../type';

export class UrlInterceptor {
  async fulfilled (config: IRequestConfig) {
    const isExternal = /^(https?:)/.test(config.url);
    if (!isExternal) {
      const hasServer = !!config.server;
      if (!hasServer) {
        throw new Error(`API_BASE not found 'server: ${config.server}' config`);
      }
      config.url = `${config.server}${config.url}`;
    }
    return config;
  }
}
