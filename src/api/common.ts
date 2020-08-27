export type Method = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type Response = { status: number, data?: any };

export type UrlParams = {
	[key: string]: string
}

export type Request =
	(urlParams?: UrlParams, data?: any) => Promise<Response>;

export type Service = {
	[key: string]: {
		[key in Method]: Request
	}
};

export const methodNotAllowed = (): Promise<Response> => (
	Promise.reject({ status: 405 })
);
