import _ from 'lodash';
import moment from 'moment';
import {
	dateFormat,
	TimeTrack,
	TimeTrackLabel,
	TimeTracksByUser,
	UsersIds,
} from '../types';

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
): TimeTrack => ({
	id,
	userId,
	duration: getRandomTrackedTime(9),
	date,
	label: getRandomLabel(),
});

const generateTracksForMonth = (
	id: number,
	userId: number,
	month: number,
	startFrom?: number,
): TimeTrack[] => {
	const startPoint = startFrom || numDaysByMonth[month];
	const tracks: TimeTrack[] = [];

	for (let i = startPoint; i > 0; i--) {
		const date = moment().month(month).day(i).format(dateFormat);

		tracks.push(generateTrack(id, userId, date));
	}

	return tracks;
};

// Generate tracks for last three month
export const generateTimeTracks = (usersIds: UsersIds): TimeTracksByUser => {
	const date = moment();
	const day = date.day();
	const month = date.month();

	return _.reduce(usersIds, (result, userId) => {
		const tracks: TimeTrack[] = [];
		let id = 1;

		for (let i = month; i > 0; i--) {
			const startDay = i === month ? day : null;

			tracks.push(...generateTracksForMonth(id, userId, i, startDay));
			id++;

			// We generate only last 3 month of the current year
			if (month - i === 3) {
				break;
			}
		}
		result[userId] = tracks;

		return result;
	}, {} as TimeTracksByUser);
};
