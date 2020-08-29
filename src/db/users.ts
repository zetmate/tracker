import faker from 'faker';
import { UsersData } from './types';

const getRandomTrackedTime = (ceil: number): number => (
	Math.random() * ceil + 1
);

const generateUsersData = (): UsersData => {
	const numUsers = 10100;

	const users: UsersData['content'] = [];
	const total: UsersData['total'] = {
		users: numUsers,
		productiveTime: 0,
		unproductiveTime: 0,
		clockedTime: 0,
	};

	for (let i = 0; i < numUsers; i++) {
		const productiveTime = getRandomTrackedTime(20000);
		const unproductiveTime = getRandomTrackedTime(5000);
		const totalTime = productiveTime + unproductiveTime;

		users.push({
			id: i,
			name: faker.name.findName(),
			productiveTime,
			unproductiveTime,
			totalTime,
			productivityRatio: productiveTime / unproductiveTime,
		});

		total.clockedTime += totalTime;
		total.productiveTime += productiveTime;
		total.unproductiveTime += unproductiveTime;
	}

	return {
		content: users,
		total,
	};
};

const usersData = generateUsersData();
export default usersData;
