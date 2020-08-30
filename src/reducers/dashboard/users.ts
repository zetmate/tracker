import { UsersData } from '../../db';
import { AsyncAction } from '../../utils';
import { FETCH_USERS } from '../../actions/api';
import { fromJS, Map } from 'immutable';

export const usersData = (
	state: UsersData = null,
	action: AsyncAction<UsersData>,
) => {
	if (action.type === FETCH_USERS && action.asyncState.state === 'success') {
		return Map(fromJS(action.data));
	}
	return state;
};
