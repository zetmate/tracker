import _ from 'lodash';
import { UserData, UsersData } from '../../../db';

const checkFilter = (pair: string, user: UserData): boolean => {
	const separator = ':';

	if (!pair.includes(separator)) {
		console.error('[usersService]: search string is invalid');
		return false;
	}

	const [key, value] = pair.split(separator);

	const valueRegex = new RegExp(value, 'i');
	const adaptedValue = _.toString(_.get(user, key) || '');

	return valueRegex.test(adaptedValue);
};

const checkFilters = (pairs: string[], user: UserData): boolean => (
	_.reduce(pairs, (result, pair) => (
		result && checkFilter(pair, user)
	), true)
);

export const filterUsersList = (
	searchString: string,
	data: UsersData,
): UsersData => {
	const pairs = searchString.split(',');

	const total: UsersData['total'] = {
		clockedTime: 0,
		productiveTime: 0,
		unproductiveTime: 0,
		users: 0,
	};

	const content = _.filter(data.content, (user) => {
		const isSuitable = checkFilters(pairs, user);

		if (isSuitable) {
			total.clockedTime += user.totalTime;
			total.productiveTime += user.productiveTime;
			total.unproductiveTime += user.unproductiveTime;
		}
		return isSuitable;
	});

	return { content, total };
};
