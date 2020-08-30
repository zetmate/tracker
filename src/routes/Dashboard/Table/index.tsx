import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';

import { UserData } from '../../../db';
import { Table, Switch, message } from 'antd';
import paths from '../../paths';
import { useHistory } from 'react-router-dom';
import { useAsyncDispatch } from '../../../utils';
import { api } from '../../../actions';

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

const getColumns = (
	history: ReturnType<typeof useHistory>,
	onIsEnabledChange: (checked: boolean, data: UserData) => void,
) => [
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
		title: 'Is Enabled',
		key: 'isEnabled',
		render(text: string, record: UserData) {
			return (
				<Switch
					defaultChecked={ !record.isDisabled }
					onChange={ checked => onIsEnabledChange(checked, record) }
				/>
			);
		},
	},
	{
		title: 'See more details',
		key: 'seeDetails',
		render(text: string, record: UserData) {
			const profileUrl = paths.userProfile
				.replace(':userId', _.toString(record.id));

			const onClick = () => history.replace(profileUrl);

			return (
				<a onClick={ onClick }>
					Profile
				</a>
			);
		},
	},
];

const UsersTable: React.FC<Props> = React.memo((props) => {
	const { usersList, isLoading } = props;
	const history = useHistory();
	const asyncDispatch = useAsyncDispatch();

	const onIsEnabledChange = useCallback((
		checked: boolean, data: UserData,
	) => {
		asyncDispatch(api.setUserData({
			...data,
			isDisabled: !checked,
		}))
			.then(() => message.success('User data has been updated'))
		;
	}, [asyncDispatch]);

	const columns = useMemo(() => (
		getColumns(history, onIsEnabledChange)
	), [history, onIsEnabledChange]);

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
