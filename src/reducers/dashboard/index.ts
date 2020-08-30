import { combineReducers } from 'redux-immutable';
import { getAsyncStateReducer } from '../utils';
import { FETCH_USERS } from '../../actions';
import { usersData } from './users';
import { usersFilter } from './filter';

export default combineReducers({
	asyncState: getAsyncStateReducer([FETCH_USERS]),
	usersData,
	usersFilter,
});
