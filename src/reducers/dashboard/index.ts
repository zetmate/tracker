import { combineReducers } from 'redux';
import { getAsyncStateReducer } from '../utils';
import { FETCH_USERS } from '../../actions';
import { usersData } from './users';

export default combineReducers({
	asyncState: getAsyncStateReducer([FETCH_USERS]),
	usersData,
});
