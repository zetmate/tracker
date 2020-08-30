import _ from 'lodash';

import { AsyncAction, DateRange } from '../../utils';
import { AuthData, TimeTrack, UserData, UsersData } from '../../db';
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
	name?: string,
	isDisabled?: string,
	dateRange?: DateRange,
}

const parseFilterToQuery = (filter: UsersFilter) => {
	// Search
	const searchObj = _.omit(filter, 'dateRange');

	const searchString = _.reduce(searchObj, (result, value, key) => (
		`${ result ? `${ result },` : '' }${ key }:${ value }`
	), '');

	const searchQuery = searchString ? { search: searchString } : {};

	// DateRange
	const dateRange = filter.dateRange;
	const dateRangeQuery = dateRange
		? { dateRange: `${ dateRange[0] }:${ dateRange[1] }` }
		: {};

	return {
		...searchQuery,
		...dateRangeQuery,
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

/*
* Set user data
* */
export const SET_USER_DATA = 'SET_USER_DATA';

const _setUserData = getAsyncActionCreator<UsersData>(SET_USER_DATA);

const setUserData = (data: UserData) => {
	return (dispatch: Dispatch<AsyncAction<UsersData>>) => {
		// Set pending
		dispatch(_setUserData({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/:userId',
				method: 'PUT',
				urlParams: {
					userId: _.toString(data.id),
				},
				data,
			})
			.then(
				({ data }) => {
					dispatch(_setUserData({
						state: 'success',
					}, data));
				},
				() => {
					dispatch(_setUserData({
						state: 'error',
						msg: 'Can not save user data',
					}));
				},
			);
	};
};

/*
* Set user data
* */
export const GET_USER_DATA = 'GET_USER_DATA';

const _getUserData = getAsyncActionCreator<UsersData>(GET_USER_DATA);

const getUserData = (userId: number) => {
	return (dispatch: Dispatch<AsyncAction<UsersData>>) => {
		// Set pending
		dispatch(_getUserData({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/:userId',
				method: 'GET',
				urlParams: {
					userId: _.toString(userId),
				},
			})
			.then(
				({ data }) => {
					dispatch(_getUserData({
						state: 'success',
					}, data));
				},
				() => {
					dispatch(_getUserData({
						state: 'error',
						msg: 'Can not save user data',
					}));
				},
			);
	};
};

/*
* Add time track
* */
export const CREATE_TIME_TRACK = 'CREATE_TIME_TRACK';

const _createTimeTrack = getAsyncActionCreator<TimeTrack>(CREATE_TIME_TRACK);

const createTimeTrack = (data: TimeTrack) => {
	return (dispatch: Dispatch<AsyncAction<TimeTrack>>) => {
		// Set pending
		dispatch(_createTimeTrack({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/:userId/time-tracks',
				method: 'POST',
				urlParams: {
					userId: _.toString(data.userId),
				},
				data,
			})
			.then(
				({ data }) => {
					dispatch(_createTimeTrack({
						state: 'success',
					}, data));
				},
				() => {
					dispatch(_createTimeTrack({
						state: 'error',
						msg: 'Can not add new time track',
					}));
				},
			);
	};
};

/*
* Get time track
* */
export const GET_USER_TIME_TRACKS = 'GET_USER_TIME_TRACKS';

const _getUserTimeTracks
	= getAsyncActionCreator<TimeTrack[]>(GET_USER_TIME_TRACKS);

const getUserTimeTracks = (userId: number) => {
	return (dispatch: Dispatch<AsyncAction<TimeTrack[]>>) => {
		// Set pending
		dispatch(_getUserTimeTracks({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/:userId/time-tracks',
				method: 'GET',
				urlParams: {
					userId: _.toString(userId),
				},
			})
			.then(
				({ data }) => {
					dispatch(_getUserTimeTracks({
						state: 'success',
					}, data));
				},
				() => {
					dispatch(_getUserTimeTracks({
						state: 'error',
						msg: 'Can not add new time track',
					}));
				},
			);
	};
};

export default {
	signUp,
	fetchUsers,
	setUserData,
	getUserData,
	createTimeTrack,
	getUserTimeTracks,
};
