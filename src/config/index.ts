import API from '../api';
import { AuthData } from '../api/auth';

const server = new API();

export const api = {
	login(data: AuthData): Promise<any> {
		return server.request({
			servicePath: '/oauth',
			url: '/authenticate',
			method: 'POST',
			data,
		});
	},
};
