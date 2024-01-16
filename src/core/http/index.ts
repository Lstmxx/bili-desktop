import DashHttp from './DashHttp';
import Http from './Http';
import { requestInterceptors } from './interceptors/request';
import { responseInterceptor } from './interceptors/response';

const http = new Http({ interceptors: { request: requestInterceptors, response: responseInterceptor } });

export const dashHttp = new DashHttp({ interceptors: { request: requestInterceptors, response: responseInterceptor } });

export default http;
