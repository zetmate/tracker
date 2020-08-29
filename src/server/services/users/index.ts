import {
	Service,
	methodNotAllowed,
	RequestOptions,
	Request,
} from '../../common';

import { db } from '../../../db';
import { filterUsersList } from './filter';

const usersService: Service = {
	baseUrl: '/users',
	api: {
		'/': {
			'POST'({ data }: RequestOptions): ReturnType<Request> {
				return new Promise((resolve) => {
					console.log('creating new user:', data.username);

					setTimeout(
						() => resolve({ status: 201 }),
						500,
					);
				});
			},

			// Search param pattern: ?search=prop0:value0,prop1:value1
			'GET'({ queryParams }): ReturnType<Request> {
				const searchString = queryParams.search;

				return db.getUsersData()
					.then(
						usersData => {
							const result = searchString
								? filterUsersList(searchString, usersData)
								: usersData
							;

							return new Promise(resolve => {
								setTimeout(() => {
									resolve({
										status: 200,
										data: result,
									});
								}, 1000);
							});
						},
					);
			},
			'PATCH': methodNotAllowed,
			'PUT': methodNotAllowed,
			'DELETE': methodNotAllowed,
		},
	},
};
export default usersService;
