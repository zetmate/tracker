import { combineReducers } from 'redux-immutable';

import auth from './auth';
import dashboard from './dashboard';
import user from './user';

export default combineReducers({
	auth,
	dashboard,
	user,
});
