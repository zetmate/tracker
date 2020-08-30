import { combineReducers } from 'redux-immutable';
import { List, Map, fromJS } from 'immutable';

import { TimeTrack, UserData } from '../../db';
import { AsyncAction } from '../../utils';
import { GET_USER_DATA, GET_USER_TIME_TRACKS } from '../../actions/api';
import { getAsyncStateReducer } from '../utils';

type UserDataKey = keyof UserData;

const data = (
	state: UserData = null,
	action: AsyncAction<UserData>,
) => {
	const hasFetched = action?.asyncState?.state === 'success';

	if (action.type === GET_USER_DATA && hasFetched) {
		return Map(fromJS(action.data));
	}
	return state;
};

const timeTracks = (
	state: TimeTrack[] = null,
	action: AsyncAction<TimeTrack[]>,
) => {
	const hasFetched = action?.asyncState?.state === 'success';

	if (action.type === GET_USER_TIME_TRACKS && hasFetched) {
		return List(fromJS(action.data));
	}
	return state;
};

export default combineReducers({
	asyncState: getAsyncStateReducer([GET_USER_DATA]),
	data,
	timeTracks,
});
