import _ from 'lodash';
import moment from 'moment';
import {
	dateFormat,
	TimeTrack,
	TimeTrackLabel,
	TimeTracksByUser,
	UsersIds,
} from '../types';
import { getKeyForUserTracks } from '../keys';

const labels: TimeTrackLabel[] = ['productive', 'unproductive'];

const getRandomLabel = () => {
	const index = Math.round(Math.random());
	return labels[index];
};

const getRandomTrackedTime = (ceil: number): number => (
	Math.random() * ceil + 1
);

// NB: for 2020 only (feb has 29)
const numDaysByMonth: { [key: number]: number } = {
	0: 31,
	1: 29,
	2: 31,
	3: 30,
	4: 31,
	5: 30,
	6: 31,
	7: 31,
	8: 30,
	9: 31,
	10: 30,
	11: 31,
};

const generateTrack = (
	id: number,
	userId: number,
	date: string,
): TimeTrack => {
	const label = getRandomLabel();
	const maxHours = label === 'productive' ? 9 : 5;

	return {
		id,
		userId,
		duration: getRandomTrackedTime(maxHours),
		date,
		label,
	};
};

const generateTracksForMonth = (
	id: number,
	userId: number,
	month: number,
	startFrom?: number,
): TimeTrack[] => {
	const startPoint = startFrom || numDaysByMonth[month];
	const tracks: TimeTrack[] = [];

	let trackId = id++;

	// some days are skipped fro performance reasons
	let i = startPoint;
	while (i > 0) {
		const date = moment().month(month).day(i).format(dateFormat);

		tracks.push(generateTrack(trackId++, userId, date));

		const step = Math.round(Math.random() * 8 + 4);
		i -= step;
	}

	return tracks;
};

// Generate tracks
export const generateTimeTracks = (usersIds: UsersIds): TimeTracksByUser => {
	const date = moment();
	const day = date.day();
	const month = date.month();

	let id = 1;
	return _.reduce(usersIds, (result, userId) => {
		const tracks: TimeTrack[] = [];

		for (let i = month - 1; i > 0; i--) {
			const startDay = i === month ? day : null;

			tracks.push(...generateTracksForMonth(id, userId, i, startDay));
			id = tracks.length;

			// We generate only last 2 month of the current year
			if (month - i === 3) {
				break;
			}
		}
		result[getKeyForUserTracks(userId)] = tracks;

		return result;
	}, {} as TimeTracksByUser);
};
