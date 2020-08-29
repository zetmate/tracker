import React from 'react';
import { WithLoader } from '../../components';
import UsersTable from './Table';

const Dashboard: React.FC = React.memo(() => {

	return (
		<WithLoader isLoading={ false }>
			<UsersTable usersList={ [] } />
		</WithLoader>
	);
});
Dashboard.displayName = 'Dashboard';
export default Dashboard;
