import type { Response } from '@tauri-apps/api/http';
import { type IResponse } from '../../type';
import { enqueueSnackbar } from 'notistack';

export class ResponseInterceptor {
  async fulfilled (response: Response<any>) {
    console.log('-----------');
    console.log(`url ${response.url}`);
    console.log('response', response);
    console.log('-----------');
    if (!response.ok) {
      return await Promise.reject(new Error('未知错误'));
    }
    const data = response.data as IResponse<any>;
    if (response.headers['content-type'].includes('json') && data.code !== 0) {
      return await Promise.reject(new Error(data.message));
    }
    return response;
  }

  async rejected (error: Error) {
    enqueueSnackbar(error.message ?? '网络错误', { variant: 'error' });
    console.error(error);
    return await Promise.reject(error);
  }
}
