import { UsersData } from '../../db';
import { AsyncAction } from '../../utils';
import { FETCH_USERS } from '../../actions/api';

export const usersData = (
	state: UsersData = null,
	action: AsyncAction<UsersData>,
) => {
	if (action.type === FETCH_USERS && action.asyncState.state === 'success') {
		return usersData;
	}
	return state;
};
