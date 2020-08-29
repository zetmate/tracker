import _ from 'lodash';
import localforage from 'localforage';
import usersData from './users';
import { UsersData } from './types';

type Key = 'usersData';
const keys: { [key in Key]: string } = {
	usersData: 'usersData',
};

const data: { [key in Key]: any } = {
	usersData,
};

export const initDb = (): Promise<any> => {
	const isInitializedKey = 'isDbInitialized';

	// Check if data already exists
	return localforage.getItem(isInitializedKey)
		.then(value => {
			if (value) {
				return value;
			}
			// If no data found, set it
			return Promise
				.all(_.map(data, (value, key) => (
					localforage.setItem(key, value)
				)))
				.then(
					() => localforage.setItem(isInitializedKey, true),
				);
		});
};

export const db = {
	getUsersData(): Promise<UsersData> {
		return localforage.getItem(keys.usersData);
	},
};

export * from './types';
