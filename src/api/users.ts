import { Service, methodNotAllowed, UrlParams, Request } from './common';

export const usersService: Service = {
	'/': {
		'POST'(urlParams: UrlParams, data: any): ReturnType<Request> {
			return new Promise((resolve) => {
				console.log('creating new user:', data.username);

				setTimeout(
					() => resolve({ status: 201 }),
					500,
				);
			});
		},

		// TODO: implement me
		'GET'() {
			console.error('[usersService]: /users GET is not implemented');
			return Promise.reject();
		},
		'PATCH': methodNotAllowed,
		'PUT': methodNotAllowed,
		'DELETE': methodNotAllowed,
	},
};
