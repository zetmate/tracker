import { UsersFilter } from '../api';

export const FILTER_USERS = 'FILTER_USERS';
const filterUsers = (filter: UsersFilter) => ({
	type: FILTER_USERS,
	data: filter,
});

export default {
	filterUsers,
};
