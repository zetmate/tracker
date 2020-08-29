import _ from 'lodash';
import faker from 'faker';
import {
	TimeTrack,
	TimeTracksByUser,
	UserData,
	UsersData,
	UsersIds,
} from '../types';

export const generateUsersIds = (): UsersIds => {
	const numUsers = 10100;
	const result = [];

	for (let i = 0; i < numUsers; i++) {
		result.push(i);
	}
	return result;
};

type UserTimeData = {
	productiveTime: UserData['productiveTime'],
	unproductiveTime: UserData['unproductiveTime'],
	totalTime: UserData['totalTime'],
}

const parseUserTimeFromTracks = (
	userTracks: TimeTrack[],
): UserTimeData => (
	_.reduce(userTracks, (result, track) => {
		const totalTime = result.totalTime + track.duration;
		const updatedResult = {
			...result,
			totalTime,
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
	}, { totalTime: 0, productiveTime: 0, unproductiveTime: 0 })
);

export const generateUsersData = (
	usersIds: UsersIds,
	timeTracks: TimeTracksByUser,
): UsersData => {
	const numUsers = usersIds.length;
	const total: UsersData['total'] = {
		users: numUsers,
		productiveTime: 0,
		unproductiveTime: 0,
		clockedTime: 0,
	};

	const users: UsersData['content'] = _.map(usersIds, id => {
		const tracks = (_.get(timeTracks, id) || []) as TimeTrack[];
		const timeData = parseUserTimeFromTracks(tracks);
		const { totalTime, productiveTime, unproductiveTime } = timeData;

		total.clockedTime += totalTime;
		total.productiveTime += productiveTime;
		total.unproductiveTime += unproductiveTime;

		return {
			id,
			name: faker.name.findName(),
			...timeData,
			productivityRatio: productiveTime / unproductiveTime,
		};
	});

	return {
		content: users,
		total,
	};
};
