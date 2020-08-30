import _ from 'lodash';
import { AsyncAction, AsyncState } from '../utils';
import { Map, fromJS } from 'immutable';

/**
 * Creates async state reducer
 * @param actionTypes - list of action types that should be handled by reducer
 */
export const getAsyncStateReducer = (
	actionTypes: string[],
) => {
	return (state: AsyncState = null, action: AsyncAction<unknown>) => {

		if (_.includes(actionTypes, action.type)) {
			return Map(fromJS(action.asyncState));
		}

		return state;
	};
};
