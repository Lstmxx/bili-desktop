import { HeaderInterceptor } from './HeaderInterceptor';
import { ParamsInterceptor } from './ParamsInterceptor';
import { UrlInterceptor } from './UrlInterceptor';

export const requestInterceptors = [new HeaderInterceptor(), new UrlInterceptor(), new ParamsInterceptor()];
