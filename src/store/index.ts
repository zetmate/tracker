import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export type RootState = ReturnType<typeof rootReducer>;

const defaultState: RootState = {
	auth: {
		asyncState: {
			state: 'initial',
		},
		username: null,
	},
	dashboard: {
		asyncState: {
			state: 'initial',
		},
		usersData: {
			content: [],
			total: {
				users: 0,
				productiveTime: 0,
				unproductiveTime: 0,
				clockedTime: 0,
			},
		},
		usersFilter: {},
	},
	user: {
		asyncState: {
			state: 'initial',
		},
		data: {
			id: null,
			name: null,
			clockedTime: null,
			productiveTime: null,
			unproductiveTime: null,
			productivityRatio: null,
			isDisabled: null,
		},
		timeTracks: [],
	},
};

const store = createStore(
	rootReducer,
	defaultState,
	applyMiddleware(thunk),
);

export default store;
