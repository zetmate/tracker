import API from '../api';

const server = new API();

export type AuthData = {
	username: string;
	password: string;
}

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
