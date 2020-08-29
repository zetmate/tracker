import _ from 'lodash';
import { AsyncAction, AsyncState } from '../utils';

type AsyncStateReducer
	= (state: AsyncState, action: AsyncAction<unknown>) => AsyncState;

/**
 * Creates async state reducer
 * @param actionTypes - list of action types that should be handled by reducer
 */
export const getAsyncStateReducer = (
	actionTypes: string[],
): AsyncStateReducer => {
	return (state = null, action) => {

		if (_.includes(actionTypes, action.type)) {
			return action.asyncState;
		}

		return state;
	};
};
