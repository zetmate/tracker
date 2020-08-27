export type Method = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';
export type Response<T> = { status: number, data?: T };

export type UrlParams = {
	[key: string]: string
}

export type Request<T> =
	(urlParams?: UrlParams, data?: T) => Promise<Response<T>>;

export type Service<T> = {
	[key: string]: {
		[key in Method]: Request<T>
	}
};

export const methodNotAllowed = (): Promise<Response<any>> => (
	Promise.reject({ status: 405 })
);
