import type { Response } from '@tauri-apps/api/http';
import { type IResponse } from '../../type';
import { enqueueSnackbar } from 'notistack';

export class ResponseInterceptor {
  async fulfilled (response: Response<any>) {
    console.log(`${response.url} response`, response);
    if (!response.ok) {
      return await Promise.reject(new Error('未知错误'));
    }
    const data = response.data as IResponse<any>;
    if (data.code !== 0) {
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
