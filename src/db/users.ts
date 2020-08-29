import _ from 'lodash';
import faker from 'faker';
import { UsersData } from './types';

const toFixedNumber = (float: number, numDigits: number): number => (
	_.toNumber(float.toFixed(numDigits))
);
const getRandomTrackedTime = (): number => (
	toFixedNumber(Math.random() * 1000 + 1, 1)
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
		const productiveTime = getRandomTrackedTime();
		const unproductiveTime = getRandomTrackedTime();
		const totalTime = toFixedNumber(productiveTime + unproductiveTime, 1);

		users.push({
			id: i,
			name: faker.name.findName(),
			productiveTime,
			unproductiveTime,
			totalTime,
			productivityRatio: toFixedNumber(
				productiveTime / unproductiveTime,
				2,
			),
		});

		total.clockedTime += totalTime;
		total.productiveTime += productiveTime;
		total.unproductiveTime += unproductiveTime;
	}

	return {
		content: users,
		total: {
			...total,
			clockedTime: toFixedNumber(total.clockedTime, 1),
			productiveTime: toFixedNumber(total.productiveTime, 1),
			unproductiveTime: toFixedNumber(total.unproductiveTime, 1),
		},
	};
};

const usersData = generateUsersData();
export default usersData;
