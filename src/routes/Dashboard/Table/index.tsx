import _ from 'lodash';
import React from 'react';

import { UserData } from '../../../db';
import { Table } from 'antd';

type Props = {
	usersList: UserData[],
	isLoading?: boolean,
}

const getRenderNumber = (numDigits: number) => (value: number | string) => {
	const number = _.toNumber(value);

	if (number > 1000) {
		return `${ (number / 1000).toFixed(numDigits) }k`;
	}

	return number.toFixed(numDigits);
};

const columns = [
	{
		title: 'Name',
		key: 'name',
		dataIndex: 'name',
	},
	{
		title: 'Total time (h)',
		key: 'clockedTime',
		dataIndex: 'clockedTime',
		render: getRenderNumber(1),
	},
	{
		title: 'Productive time (h)',
		key: 'productiveTime',
		dataIndex: 'productiveTime',
		render: getRenderNumber(1),
	},
	{
		title: 'Unproductive time (h)',
		key: 'unproductiveTime',
		dataIndex: 'unproductiveTime',
		render: getRenderNumber(1),
	},
	{
		title: 'Productivity ratio',
		key: 'productivityRatio',
		dataIndex: 'productivityRatio',
		render: getRenderNumber(2),
	},
];

const UsersTable: React.FC<Props> = React.memo((props) => {
	const { usersList, isLoading } = props;

	return (
		<Table
			columns={ columns }
			dataSource={ usersList }
			loading={ isLoading }
			rowKey="id"
		/>
	);
});
UsersTable.displayName = 'UsersTable';
export default UsersTable;
