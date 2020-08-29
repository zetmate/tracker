export type AuthData = {
	username: string;
	password: string;
}

export type UsersIds = number[];

export type UserData = {
	id: number,
	name: string;
	totalTime: number,
	productiveTime: number,
	unproductiveTime: number,
	productivityRatio: number,
}

export type UsersData = {
	content: UserData[],
	total: {
		users: number,
		clockedTime: number,
		productiveTime: number,
		unproductiveTime: number,
	}
}

export type TimeTrackLabel = 'productive' | 'unproductive';

export type TimeTrack = {
	id: number,
	userId: number,
	label: TimeTrackLabel,
	duration: number,
	date: string,
}

export type TimeTracksByUser = {
	[key: number]: TimeTrack[]
}

export const dateFormat = 'YYYY-MM-DD';
