import _ from 'lodash';
import { UrlParams, Response, Method } from './common';
import { authService } from './auth';
import { usersService } from './users';

export type RequestConfig = {
	urlParams?: UrlParams,
	method: Method,
	servicePath: string,
	url: string,
	data?: any,
}

export interface IApi {
	request: (config: RequestConfig) => Promise<Response>;
}

const notFound = () => Promise.reject({ status: 404 });

class API implements IApi {
	request(config: RequestConfig): ReturnType<IApi['request']> {
		const { servicePath, url, method, data, urlParams } = config;

		const service = this.services.get(servicePath);
		if (!service) {
			return notFound();
		}

		const requestService = (
			_.get(service[url], method)
		);

		if (!_.isFunction(requestService)) {
			return notFound();
		}

		return requestService(urlParams, data);
	}

	private services = new Map([
		['/oauth', authService],
		['/users', usersService],
	]);
}

export default API;
