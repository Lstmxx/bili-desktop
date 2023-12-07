import { type RouteObject } from 'react-router-dom';

export type CustomRouteObject = RouteObject & {
	name: string;
	children?: CustomRouteObject[];
};
