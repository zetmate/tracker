import _ from 'lodash';
import React, { useEffect } from 'react';
import { message } from 'antd';
import styled from 'styled-components';

import UsersTable from './Table';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAsyncDispatch } from '../../utils';
import { api } from '../../actions';
import Filter from './Filter';
import { Summary } from '../common';
import { FlexCenter } from '../../components/layout';

const Dashboard: React.FC = React.memo(() => {
	const asyncDispatch = useAsyncDispatch();

	const {
		usersData,
		asyncState,
		usersFilter,
	} = useSelector<RootState>(state => (
		state.dashboard
	)) as RootState['dashboard'];

	// Fetch users data
	useEffect(() => {
		asyncDispatch(api.fetchUsers(usersFilter))
			.catch(() => message.error('Failed to get users data'))
		;
	}, [asyncDispatch, usersFilter]);

	return (
		<Wrapper>
			<Container>
				<Filter />
				<Summary data={ usersData.total } />
				<UsersTable
					usersList={ usersData.content }
					isLoading={
						_.includes(
							['initial', 'pending'],
							asyncState.state,
						)
					}
				/>
			</Container>
		</Wrapper>
	);
});
Dashboard.displayName = 'Dashboard';
export default Dashboard;

const Wrapper = styled(FlexCenter)`
	width: 1200px;
	flex: 1 0 auto;
	align-self: center;
`;

const Container = styled.div`
	padding: 45px;
	box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
	border-radius: 20px;
`;
