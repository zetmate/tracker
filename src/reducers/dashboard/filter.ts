import { Map, fromJS } from 'immutable';
import { UsersFilter } from '../../actions/api';
import { Action, FILTER_USERS } from '../../actions';

export const usersFilter = (
	state: UsersFilter = null,
	action: Action<UsersFilter>,
) => {
	if (action.type === FILTER_USERS) {
		return Map(fromJS(action.data));
	}
	return state;
};
