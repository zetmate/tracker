import _ from 'lodash';
import faker from 'faker';
import {
	TimeTrack,
	TimeTracksByUser,
	UserData,
	UsersData, UsersDataByUser,
	UsersIds,
} from '../types';
import { getKeyForUser, getKeyForUserTracks } from '../keys';

export const generateUsersIds = (): UsersIds => {
	const numUsers = 101;
	const result = [];

	for (let i = 1; i <= numUsers; i++) {
		result.push(i);
	}
	return result;
};

type UserTimeData = {
	productiveTime: UserData['productiveTime'],
	unproductiveTime: UserData['unproductiveTime'],
	clockedTime: UserData['clockedTime'],
}

const parseUserTimeFromTracks = (
	userTracks: TimeTrack[],
): UserTimeData => (
	_.reduce(userTracks, (result, track) => {
		const clockedTime = result.clockedTime + track.duration;
		const updatedResult = {
			...result,
			clockedTime,
		};

		if (track.label === 'productive') {
			return {
				...updatedResult,
				productiveTime: track.duration + result.productiveTime,
			};
		}

		return {
			...updatedResult,
			unproductiveTime: track.duration + result.unproductiveTime,
		};
	}, { clockedTime: 0, productiveTime: 0, unproductiveTime: 0 })
);

export const generateUsersData = (
	usersIds: UsersIds,
	timeTracks: TimeTracksByUser,
): UsersDataByUser => {
	const numUsers = usersIds.length;
	const total: UsersData['total'] = {
		users: numUsers,
		productiveTime: 0,
		unproductiveTime: 0,
		clockedTime: 0,
	};

	const users: UsersDataByUser['content'] = (
		_.reduce(usersIds, (result, id) => {
			const tracks = (
				_.get(timeTracks, getKeyForUserTracks(id)) || []
			) as TimeTrack[];

			const timeData = parseUserTimeFromTracks(tracks);
			const { clockedTime, productiveTime, unproductiveTime } = timeData;

			total.clockedTime += clockedTime;
			total.productiveTime += productiveTime;
			total.unproductiveTime += unproductiveTime;

			result[getKeyForUser(id)] = {
				id,
				name: faker.name.findName(),
				...timeData,
				productivityRatio: productiveTime / unproductiveTime,
				isDisabled: false,
			};

			return result;
		}, {} as UsersDataByUser['content'])
	);

	return {
		content: users,
		total,
	};
};
