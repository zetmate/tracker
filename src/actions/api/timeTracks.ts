import { Dispatch } from 'react';

import { getAsyncActionCreator } from './common';
import { TimeTracksByUser } from '../../db';
import { AsyncAction } from '../../utils';
import server from '../../server';

const servicePath = '/time-tracks';

/*
* Fetch time tracks
* */
export const FETCH_TIME_TRACKS = 'FETCH_TIME_TRACKS';

const _fetchTimeTracks
	= getAsyncActionCreator<TimeTracksByUser>(FETCH_TIME_TRACKS);

const fetchTimeTracks = (data: TimeTracksByUser) => {
	return (dispatch: Dispatch<AsyncAction<TimeTracksByUser>>) => {
		// Set pending
		dispatch(_fetchTimeTracks({ state: 'pending' }));

		// Request data
		return server
			.request({
				servicePath,
				url: '/',
				method: 'GET',
				data,
			})
			.then(
				() => dispatch(_fetchTimeTracks({ state: 'success' }, data)),
				() => dispatch(_fetchTimeTracks({
					state: 'error',
					msg: 'Can not get time tracks',
				})),
			);
	};
};

export default {
	fetchTimeTracks,
};
