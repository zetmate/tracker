import { Service, methodNotAllowed, UrlParams, Request } from './common';
import { db } from '../db';

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

		'GET'() {
			return db.getUsersData()
				.then(
					(usersData) => ({
						status: 200,
						data: usersData,
					}),
				);
		},
		'PATCH': methodNotAllowed,
		'PUT': methodNotAllowed,
		'DELETE': methodNotAllowed,
	},
};
