import _ from 'lodash';
import { UrlParams, Response, Method, Service } from './common';
import * as services from './services';

export { Response };

export type RequestConfig = {
	urlParams?: UrlParams,
	method: Method,
	servicePath: string,
	url: string,
	data?: any,
}

export interface IServer {
	request: (config: RequestConfig) => Promise<Response>;
}

const notFound = () => Promise.reject({ status: 404 });

class Server implements IServer {
	request(config: RequestConfig): ReturnType<IServer['request']> {
		const { servicePath, url, method, data, urlParams } = config;

		const service = this.services.get(servicePath);
		if (!service) {
			return notFound();
		}

		const requestService = (
			_.get(service.api[url], method)
		);

		if (!_.isFunction(requestService)) {
			return notFound();
		}

		return requestService(urlParams, data);
	}

	private services = new Map<string, Service>(
		_.map(services, service => (
			[service.baseUrl, service]
		)),
	);
}

const server = new Server();
export default server;
