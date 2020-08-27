import { Service, methodNotAllowed, UrlParams, Request } from './common';

type AuthReturnType = ReturnType<Request>;

export const authService: Service = {
	'/authenticate': {
		'POST'(urlParams: UrlParams, data: any): AuthReturnType {
			return new Promise((resolve) => {
				console.log('logging in as:', data.username);

				setTimeout(
					() => resolve({ status: 201 }),
					3000,
				);
			});
		},

		'GET': methodNotAllowed,
		'PATCH': methodNotAllowed,
		'PUT': methodNotAllowed,
		'DELETE': methodNotAllowed,
	},
};
