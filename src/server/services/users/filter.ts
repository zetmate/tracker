import _ from 'lodash';
import moment from 'moment';

import {
	dateFormat,
	db,
	TimeTrack,
	TimeTracksByUser,
	UserData,
	UsersData,
} from '../../../db';
import { DateRange } from '../../../utils';

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

const checkSearchString = (pairs: string[], user: UserData): boolean => (
	_.reduce(pairs, (result, pair) => (
		result && checkFilter(pair, user)
	), true)
);

const checkTimeTrack = (
	timeTrack: TimeTrack,
	dateRange: DateRange,
): boolean => {
	const [minDateStr, maxDateStr] = dateRange;

	const minDate = moment(minDateStr, dateFormat);
	const maxDate = moment(maxDateStr, dateFormat);
	const trackDate = moment(timeTrack.date, dateFormat);

	return (
		trackDate.isSameOrAfter(minDate)
		&& trackDate.isSameOrBefore(maxDate)
	);
};

const getUserDataForDateRange = (
	dateRange: DateRange,
	userData: UserData,
	timeTracks: TimeTrack[],
): UserData => {
	if (!timeTracks) {
		return userData;
	}
	const initialData: UserData = {
		...userData,
		clockedTime: 0,
		productiveTime: 0,
		unproductiveTime: 0,
	};

	const filtered = _.reduce(timeTracks, (result, timeTrack) => {
		// If doesn't satisfy condition
		if (!checkTimeTrack(timeTrack, dateRange)) {
			return result;
		}

		result.clockedTime += timeTrack.duration;

		if (timeTrack.label === 'productive') {
			result.productiveTime += timeTrack.duration;
		} else {
			result.unproductiveTime += timeTrack.duration;
		}

		return result;
	}, initialData);

	filtered.productivityRatio
		= filtered.productiveTime / (filtered.unproductiveTime || 1);

	return filtered;
};

export type FilterOptions = {
	searchString: string,
	dateRangeString: string,
	usersData: UsersData,
}

export const filterUsersList = (
	{
		searchString = '',
		usersData,
		dateRangeString = '',
	}: FilterOptions,
): Promise<UsersData> => {
	const searchPair = searchString.split(',');
	const dateRange = dateRangeString
		? dateRangeString.split(':') as DateRange
		: null;

	const total: UsersData['total'] = {
		clockedTime: 0,
		productiveTime: 0,
		unproductiveTime: 0,
		users: 0,
	};

	const timeTracksPromise: Promise<TimeTracksByUser> = (
		new Promise(resolve => {
			if (dateRangeString) {
				db.getAllTimeTracksByUser()
					.then(tracks => {
						resolve(tracks);
					});
			} else {
				resolve({});
			}
		})
	);

	return timeTracksPromise
		.then(
			timeTracksByUser => {
				return _.reduce(usersData.content, (result, user) => {
					const isSuitable = searchString
						? checkSearchString(searchPair, user)
						: true
					;

					if (isSuitable) {
						const timeTracks = timeTracksByUser[user.id] || [];

						const userData = dateRange
							? getUserDataForDateRange(
								dateRange, user, timeTracks,
							)
							: user;

						total.clockedTime += userData.clockedTime;
						total.productiveTime += userData.productiveTime;
						total.unproductiveTime += userData.unproductiveTime;
						total.users++;

						result.push(userData);
					}
					return result;

				}, [] as UsersData['content']);
			},
		)
		.then(filteredContent => ({ content: filteredContent, total }));
};
