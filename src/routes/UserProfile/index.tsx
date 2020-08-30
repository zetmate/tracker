import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { message, Typography } from 'antd';
import { api } from '../../actions';
import { WithLoader } from '../../components';
import { RootState } from '../../store';
import { useParams } from 'react-router';
import { useAsyncDispatch } from '../../utils';

const showError = () => message.error('Can not get user data');

const UserProfile: React.FC = React.memo(() => {
	const { userId } = useParams();

	const { data, asyncState, timeTracks } = useSelector<RootState>(
		(state: RootState) => state.user,
	) as RootState['user'];

	const asyncDispatch = useAsyncDispatch();

	// Fetch data on mount
	useEffect(() => {
		asyncDispatch(api.getUserData(userId)).catch(showError);
		asyncDispatch(api.getUserTimeTracks(userId)).catch(showError);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	const [name, setName] = useState<string>(null);

	const onNameChange = useCallback((value: string) => {
		setName(value);

		asyncDispatch(api.setUserData({
			...data,
			name: value,
		}))
			.then(
				() => message.success('User name has been updated'),
				showError,
			)
		;
	}, [data, asyncDispatch]);

	const titleConfig = useMemo(() => ({
		onChange: onNameChange,
	}), [onNameChange]);

	return (
		<WithLoader
			isLoading={
				_.includes(
					['initial', 'pending'],
					asyncState.state,
				)
			}
		>
			<Typography.Title editable={ titleConfig }>
				{ name || data.name }
			</Typography.Title>
		</WithLoader>
	);
});

UserProfile.displayName = 'UserProfile';
export default UserProfile;
