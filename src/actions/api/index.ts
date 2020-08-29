import authApi from './auth';
import usersApi from './users';

export * from './auth';
export * from './users';

export default {
	...authApi,
	...usersApi,
};
