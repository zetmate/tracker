export type AuthData = {
	username: string;
	password: string;
}

export type UsersIds = number[];

export type UserData = {
	id: number,
	name: string;
	clockedTime: number,
	productiveTime: number,
	unproductiveTime: number,
	productivityRatio: number,
	isDisabled: boolean,
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

export type UsersDataByUser = {
	content: {
		[key: string]: UserData
	},
	total: UsersData['total']
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
	[key: string]: TimeTrack[]
}

export const dateFormat = 'YYYY-MM-DD';
