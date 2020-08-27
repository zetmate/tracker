import { Service, methodNotAllowed, UrlParams, Request } from './common';

export type AuthData = {
	username: string;
	password: string;
}

type AuthReturnType = ReturnType<Request<AuthData>>;

export const authService: Service<AuthData> = {
	'/authenticate': {
		'POST'(urlParams: UrlParams, data: AuthData): AuthReturnType {
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
