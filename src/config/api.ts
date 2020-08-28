import API from '../api';
import { AuthData } from '../db';

const server = new API();

const authServicePath = '/oauth';
const usersServicePath = '/users';

export const api = {
	login(data: AuthData): Promise<any> {
		return server.request({
			servicePath: authServicePath,
			url: '/authenticate',
			method: 'POST',
			data,
		});
	},

	signUp(data: AuthData): Promise<any> {
		return server.request({
			servicePath: usersServicePath,
			url: '/',
			method: 'POST',
			data,
		});
	},
};
