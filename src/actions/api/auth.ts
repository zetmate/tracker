import { AuthData } from '../../db';
import { Dispatch } from 'react';
import server from '../../server';
import { AsyncAction } from '../../utils';
import { getAsyncActionCreator, ThunkReturnType } from './common';

const servicePath = '/oauth';

export const LOGIN = 'LOGIN';

const _login = getAsyncActionCreator<AuthData>(LOGIN);

const login = (data: AuthData) => {

	return (dispatch: Dispatch<AsyncAction<AuthData>>) => {
		// Set pending
		dispatch(_login({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/authenticate',
				method: 'POST',
				data,
			})
			.then(
				() => dispatch(_login({ state: 'success' }, data)),
				() => dispatch(_login({
					state: 'error',
					msg: 'Authorization failed',
				})),
			);
	};
};

export default {
	login,
};
