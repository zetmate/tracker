import React, { useEffect } from 'react';
import { message } from 'antd';

import { WithLoader } from '../../components';
import UsersTable from './Table';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAsyncDispatch } from '../../utils';
import { api } from '../../actions';

const Dashboard: React.FC = React.memo(() => {
	const asyncDispatch = useAsyncDispatch();

	const { usersData, asyncState } = useSelector<RootState>(state => (
		state.dashboard
	)) as RootState['dashboard'];

	// Fetch users data
	useEffect(() => {
		asyncDispatch(api.fetchUsers())
			.catch(() => message.error('Failed to get users data'))
		;
	}, [asyncDispatch]);

	return (
		<WithLoader isLoading={ false }>
			<UsersTable
				usersList={ usersData.content }
				isLoading={ asyncState.state === 'pending' }
			/>
		</WithLoader>
	);
});
Dashboard.displayName = 'Dashboard';
export default Dashboard;
