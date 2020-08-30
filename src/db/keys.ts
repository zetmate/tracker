type Key = 'usersData' | 'timeTracks' | 'summary';

export const keys: { [key in Key]: string } = {
	usersData: 'usersData',
	timeTracks: 'time-tracks',
	summary: 'summary',
};

export const getKeyForUser = (userId: number) => {
	return `${ keys.usersData }/${ userId }`;
};

export const getKeyForUserTracks = (userId: number) => {
	return `${ getKeyForUser(userId) }/${ keys.timeTracks }`;
};
