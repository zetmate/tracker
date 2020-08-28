import localforage from 'localforage';
import usersData from './users';
import { UsersData } from './types';

const keys = {
	usersData: 'usersData',
};

export const initDb = (): Promise<any> => (
	Promise.all([
		localforage.setItem(keys.usersData, usersData),
	])
);

export const db = {
	getUsersData(): Promise<UsersData> {
		return localforage.getItem(keys.usersData);
	},
};

export * from './types';
