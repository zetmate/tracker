import _ from 'lodash';
import { combineReducers } from 'redux-immutable';

import { getAsyncStateReducer } from '../utils';
import { LOGIN, SIGN_UP } from '../../actions/api';
import { AsyncAction } from '../../utils';
import { AuthData } from '../../db';

const authActionTypes = [LOGIN, SIGN_UP];

export default combineReducers({
	asyncState: getAsyncStateReducer(authActionTypes),

	username(state: string = null, action: AsyncAction<AuthData>) {
		const isAuthAction = _.includes(authActionTypes, action.type);
		const hasFetched = action.asyncState?.state === 'success';

		if (isAuthAction && hasFetched) {
			return action.data.username;
		}

		return state;
	},
});
