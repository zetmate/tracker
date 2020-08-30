import { combineReducers } from 'redux';

import auth from './auth';
import dashboard from './dashboard';
import user from './user';

export default combineReducers({
	auth,
	dashboard,
	user,
});
