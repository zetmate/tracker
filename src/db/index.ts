import _ from 'lodash';
import localforage from 'localforage';
import { generateUsersData, generateUsersIds } from './users';
import { TimeTrack, TimeTracksByUser, UserData, UsersData } from './types';
import { generateTimeTracks } from './timeTracks';
import { getKeyForUser, getKeyForUserTracks, keys } from './keys';

interface IDataBase {
	/**
	 * Returns data for particular user
	 * @param userId
	 */
	getDataForUser: (userId: number) => Promise<UserData>;

	/**
	 * Returns users data for all users
	 */
	getAllUsersData: () => Promise<UsersData>;

	/**
	 * Replaces user data for particular user
	 * @param userId
	 */
	setDataForUser: (userId: number, data: UserData) => Promise<UserData>;

	/**
	 * Returns user's time tracks
	 * @param userId
	 */
	getTimeTracksForUser: (userId: number) => Promise<TimeTrack[]>;

	/**
	 * Sets new time track for user
	 * @param userId
	 * @param newTrack
	 */
	setNewTimeTrackForUser: (userId: number, newTrack: TimeTrack)
		=> Promise<TimeTrack[]>

	/**
	 * Returns all time tracks mapped by user
	 */
	getAllTimeTracksByUser: () => Promise<TimeTracksByUser>
}

const usersIds = generateUsersIds();
const generateData = (): { [key: string]: any } => {
	const timeTracks = generateTimeTracks(usersIds);
	const usersData = generateUsersData(usersIds, timeTracks);

	return {
		...usersData.content,
		...timeTracks,
		[keys.summary]: usersData.total,
	};
};

class DataBase implements IDataBase {
	getAllUsersData(): Promise<UsersData> {
		const result = { content: [] } as UsersData;

		const promises = _.map(usersIds, userId => (
			this.getDataForUser(userId)
				.then(
					(userData: UserData) => {
						result.content.push(userData);
					},
				)
		));

		return Promise
			.all(promises)
			.then(() => result);
	}

	getDataForUser(userId: number): Promise<UserData> {
		return localforage.getItem(getKeyForUser(userId));
	}

	setDataForUser(userId: number, data: UserData): Promise<UserData> {
		return localforage.setItem(getKeyForUser(userId), data);
	}

	getTimeTracksForUser(userId: number): Promise<TimeTrack[]> {
		return localforage.getItem(getKeyForUserTracks(userId));
	}

	setNewTimeTrackForUser(
		userId: number,
		newTrack: TimeTrack,
	): Promise<TimeTrack[]> {
		return this.getTimeTracksForUser(userId)
			.then(
				timeTracks => {
					if (newTrack) {
						timeTracks.push(newTrack);
					}

					return localforage.setItem(
						getKeyForUserTracks(userId),
						timeTracks,
					);
				},
			);
	}

	getAllTimeTracksByUser(): Promise<TimeTracksByUser> {
		const result = {} as TimeTracksByUser;

		const promises = _.map(usersIds, userId => (
			this.getTimeTracksForUser(userId)
				.then(
					(userTracks: TimeTrack[]) => (
						result[userId] = userTracks
					),
				)
		));

		return Promise
			.all(promises)
			.then(() => result);
	}
}

export const db = new DataBase();

export const initDb = (): Promise<any> => {
	const isInitializedKey = 'isDbInitialized';

	// Check if data already exists
	return localforage.getItem(isInitializedKey)
		.then(value => {
			if (value) {
				return value;
			}
			// If no data found, set it
			const data = generateData();

			return (
				// localforage.clear()
				// 	.then(() => (
				Promise
					.all(_.map(data, (value, key) => (
						localforage.setItem(key, value)
					)))
					.then(
						() => (
							localforage.setItem(isInitializedKey, true)
						),
					)// ))
			);
		});
};

export * from './types';
