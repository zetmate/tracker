import { Service, methodNotAllowed } from '../common';
import { Request } from '../common';

const authService: Service = {
	baseUrl: '/oauth',
	api: {
		'/authenticate': {
			'POST'(): ReturnType<Request> {
				return new Promise((resolve) => {
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
	},
};

export default authService;
