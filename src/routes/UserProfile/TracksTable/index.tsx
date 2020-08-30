import _ from 'lodash';
import React from 'react';
import { TimeTrack } from '../../../db';
import { Table } from 'antd';

type Props = {
	data: TimeTrack[],
	isLoading: boolean,
}

const columns = [
	{
		title: 'Type',
		key: 'type',
		dataIndex: 'label',
	},
	{
		title: 'Date',
		key: 'date',
		dataIndex: 'date',
	},
	{
		title: 'Duration (h)',
		key: 'duration',
		dataIndex: 'duration',
		render: (value: string) => _.toNumber(value).toFixed(1),
	},
];

const TracksTable: React.FC<Props> = React.memo((props) => {
	const { data, isLoading } = props;

	return (
		<Table
			columns={ columns }
			dataSource={ data }
			loading={ isLoading }
			rowKey="id"
		/>
	);
});
TracksTable.displayName = 'TracksTable';
export default TracksTable;
