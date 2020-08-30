import _ from 'lodash';
import React, { useMemo } from 'react';

import { UserData } from '../../../db';
import { Button, Table } from 'antd';
import paths from '../../paths';
import { useHistory } from 'react-router-dom';

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

const getColumns = (history: ReturnType<typeof useHistory>) => [
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
	{
		title: 'See more details',
		key: 'seeDetails',
		render(text: string, record: UserData) {
			const profileUrl = paths.userProfile
				.replace(':userId', _.toString(record.id));

			const onClick = () => history.replace(profileUrl);

			return (
				<Button type="link" onClick={ onClick }>
					Profile
				</Button>
			);
		},
	},
];

const UsersTable: React.FC<Props> = React.memo((props) => {
	const { usersList, isLoading } = props;
	const history = useHistory();

	const columns = useMemo(() => getColumns(history), [history]);

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
