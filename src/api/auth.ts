import { Service, methodNotAllowed, UrlParams, Request } from './common';

export const authService: Service = {
	'/authenticate': {
		'POST'(urlParams: UrlParams, data: any): ReturnType<Request> {
			return new Promise((resolve) => {
				console.log('logging in as:', data.username);

				setTimeout(
					() => resolve({ status: 201 }),
					500,
				);
			});
		},

		'GET': methodNotAllowed,
		'PATCH': methodNotAllowed,
		'PUT': methodNotAllowed,
		'DELETE': methodNotAllowed,
	},
};
