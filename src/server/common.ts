export type Method = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type Response = { status: number, data?: any };

export type UrlParams = {
	[key: string]: string
}

export type Request =
	(urlParams?: UrlParams, data?: any) => Promise<Response>;

export type ServiceApi = {
	[key: string]: {
		[key in Method]: Request
	}
}

export type Service = {
	baseUrl: string,
	api: ServiceApi
};

export const methodNotAllowed = (): Promise<Response> => (
	Promise.reject({ status: 405 })
);
