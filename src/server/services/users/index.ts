import _ from 'lodash';

import {
	Service,
	methodNotAllowed,
	RequestOptions,
	Request,
} from '../../common';

import { db } from '../../../db';
import { filterUsersList } from './filter';

const rejectInvalidUserId = (userId: string): ReturnType<Request> => {
	console.error(
		'[userData]: you must set a userId in urlParams',
	);

	return Promise.reject({
		status: 400,
		data: {
			msg: `${ userId } is not a valid user id`,
		},
	});
};

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
				const dateRangeString = queryParams.dateRange;

				return db.getAllUsersData()
					.then(
						usersData => (
							filterUsersList({
								searchString,
								dateRangeString,
								usersData,
							})
						),
					)
					.then(
						filteredData => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({
										status: 200,
										data: filteredData,
									});
								}, 500);
							})
						),
					);
			},
			'PATCH': methodNotAllowed,
			'PUT': methodNotAllowed,
			'DELETE': methodNotAllowed,
		},
		'/:userId': {
			'PUT'(
				{ data, urlParams = {} }: RequestOptions,
			): ReturnType<Request> {
				const userId = urlParams.userId;

				if (!userId) {
					return rejectInvalidUserId(userId);
				}

				return db.setDataForUser(_.toNumber(userId), data)
					.then(
						() => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({ status: 200 });
								}, 300);
							})
						),
					);
			},
			'GET'({ urlParams = {} }: RequestOptions): ReturnType<Request> {
				const userId = urlParams.userId;

				if (!userId) {
					return rejectInvalidUserId(userId);
				}

				return db.getDataForUser(_.toNumber(userId))
					.then(
						data => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({ status: 200, data });
								}, 300);
							})
						),
					);
			},
			'PATCH': methodNotAllowed,
			'POST': methodNotAllowed,
			'DELETE': methodNotAllowed,
		},
		'/:userId/time-tracks': {
			'POST'(
				{ data, urlParams = {} }: RequestOptions,
			): ReturnType<Request> {
				const userId = urlParams.userId;

				if (!userId) {
					return rejectInvalidUserId(userId);
				}

				return db.setNewTimeTrackForUser(_.toNumber(userId), data)
					.then(
						() => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({ status: 201 });
								}, 500);
							})
						),
					);
			},
			'GET'({ urlParams = {} }: RequestOptions): ReturnType<Request> {
				const userId = urlParams.userId;

				if (!userId) {
					return rejectInvalidUserId(userId);
				}

				return db.getTimeTracksForUser(_.toNumber(userId))
					.then(
						data => (
							new Promise(resolve => {
								setTimeout(() => {
									resolve({ status: 200, data });
								}, 300);
							})
						),
					);
			},
			'PATCH': methodNotAllowed,
			'PUT': methodNotAllowed,
			'DELETE': methodNotAllowed,
		},
	},
};
export default usersService;
