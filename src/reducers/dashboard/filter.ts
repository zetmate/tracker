import { UsersFilter } from '../../actions/api';
import { Action, FILTER_USERS } from '../../actions';

export const usersFilter = (
	state: UsersFilter = null,
	action: Action<UsersFilter>,
): UsersFilter => {
	if (action.type === FILTER_USERS) {
		return action.data;
	}
	return state;
};
