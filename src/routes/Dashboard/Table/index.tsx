import React from 'react';

import { UserData } from '../../../db';
import { Table } from 'antd';

type Props = {
	usersList: UserData[]
}

const columns = [
	{
		title: 'Name',
		key: 'name',
		dataIndex: 'name',
	},
	{
		title: 'Total time',
		key: 'totalTime',
		dataIndex: 'totalTime',
	},
	{
		title: 'Productive time',
		key: 'productiveTime',
		dataIndex: 'productiveTime',
	},
	{
		title: 'Unproductive time',
		key: 'unproductiveTime',
		dataIndex: 'unproductiveTime',
	},
	{
		title: 'Productivity ratio',
		key: 'productivityRatio',
		dataIndex: 'productivityRatio',
	},
];

const UsersTable: React.FC<Props> = React.memo(({ usersList }) => {
	return (
		<Table columns={ columns } dataSource={ usersList } />
	);
});
UsersTable.displayName = 'UsersTable';
export default UsersTable;
