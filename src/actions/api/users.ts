import _ from 'lodash';

import { AsyncAction } from '../../utils';
import { AuthData, UsersData } from '../../db';
import { Dispatch } from 'react';
import server from '../../server';
import { getAsyncActionCreator } from './common';

const servicePath = '/users';

/*
* Create new user
* */
export const SIGN_UP = 'SIGN_UP';

const _signUp = getAsyncActionCreator<AuthData>(SIGN_UP);

const signUp = (data: AuthData) => {
	return (dispatch: Dispatch<AsyncAction<AuthData>>) => {
		// Set pending
		dispatch(_signUp({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/',
				method: 'POST',
				data,
			})
			.then(
				() => dispatch(_signUp({ state: 'success' }, data)),
				() => dispatch(_signUp({
					state: 'error',
					msg: 'Can not create a user',
				})),
			);
	};
};

/*
* Fetch users
* */
export const FETCH_USERS = 'FETCH_USERS';

export type UsersFilter = {
	name?: string
}

const parseFilterToQuery = (filter: UsersFilter) => {
	const searchString = _.reduce(filter, (result, value, key) => (
		`${ result ? `${ result },` : '' }${ key }:${ value }`
	), '');

	if (!searchString) {
		return {};
	}

	return {
		search: searchString,
	};
};

const _fetchUsers = getAsyncActionCreator<UsersData>(FETCH_USERS);

const fetchUsers = (filter: UsersFilter = {}) => {
	return (dispatch: Dispatch<AsyncAction<UsersData>>) => {
		// Set pending
		dispatch(_fetchUsers({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/',
				method: 'GET',
				queryParams: parseFilterToQuery(filter),
			})
			.then(
				({ data }) => dispatch(_fetchUsers({ state: 'success' }, data)),
				() => dispatch(_fetchUsers({
					state: 'error',
					msg: 'Data fetch failed',
				})),
			);
	};
};

export default {
	signUp,
	fetchUsers,
};
