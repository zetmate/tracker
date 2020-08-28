import { AsyncAction, AsyncState } from '../../utils';
import { AuthData } from '../../db';
import { Dispatch } from 'react';
import server from '../../server';
import { getAsyncActionCreator } from './common';

const servicePath = '/users';

/*
* Create new user
* */
export const SIGN_UP = 'SIGN_UP';

const _signUp = getAsyncActionCreator(SIGN_UP);

const signUp = (data: AuthData) => {
	return (dispatch: Dispatch<AsyncAction>) => {
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
				() => dispatch(_signUp({ state: 'success' })),
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

const _fetchUsers = getAsyncActionCreator(FETCH_USERS);

const fetchUsers = () => {
	return (dispatch: Dispatch<AsyncAction>) => {
		// Set pending
		dispatch(_fetchUsers({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/',
				method: 'GET',
			})
			.then(
				() => dispatch(_fetchUsers({ state: 'success' })),
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
