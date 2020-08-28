export type AuthData = {
	username: string;
	password: string;
}

export type UserData = {
	key: number,
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
