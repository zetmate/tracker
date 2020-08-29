import React from 'react';

import { UserData } from '../../../db';
import { Table } from 'antd';

type Props = {
	usersList: UserData[],
	isLoading: boolean,
}

const columns = [
	{
		title: 'Name',
		key: 'name',
		dataIndex: 'name',
	},
	{
		title: 'Total time (h)',
		key: 'totalTime',
		dataIndex: 'totalTime',
	},
	{
		title: 'Productive time (h)',
		key: 'productiveTime',
		dataIndex: 'productiveTime',
	},
	{
		title: 'Unproductive time (h)',
		key: 'unproductiveTime',
		dataIndex: 'unproductiveTime',
	},
	{
		title: 'Productivity ratio',
		key: 'productivityRatio',
		dataIndex: 'productivityRatio',
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
