import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { message } from 'antd';
import { api } from '../../actions';
import { WithLoader } from '../../components';
import { RootState } from '../../store';
import { useParams } from 'react-router';
import { useAsyncDispatch } from '../../utils';
import Name from './Name';
import { Summary, SummaryProps } from '../common';
import { FlexCenter, FlexColumn } from '../../components/layout';
import TracksTable from './TracksTable';
import AddNewTimeTrack, { FormData } from './AddNewTrack';

const showError = () => message.error('Can not get user data');

const UserProfile: React.FC = React.memo(() => {
	const { userId } = useParams();
	const [areTracksLoading, setAreTracksLoading] = useState<boolean>(true);

	const { data, asyncState, timeTracks } = useSelector<RootState>(
		(state: RootState) => state.user,
	) as RootState['user'];

	const asyncDispatch = useAsyncDispatch();

	const fetchTimeTracks = useCallback(() => {
		asyncDispatch(api.getUserTimeTracks(userId))
			.then(
				() => setAreTracksLoading(false),
				showError,
			);
	}, [asyncDispatch, userId]);

	// Fetch data on mount
	useEffect(() => {
		asyncDispatch(api.getUserData(userId)).catch(showError);
		fetchTimeTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	const onNameChange = useCallback((value: string) => {
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

	const onCreateTimeTrack = useCallback((data: FormData) => {
		message.loading('Creating new time track');

		asyncDispatch(api.createTimeTrack({
			userId,
			id: timeTracks.length + 1,
			...data,
		}))
			// .then(message.success('New time track has been created'))
			.then(fetchTimeTracks)
		;
	}, [asyncDispatch, userId, timeTracks, fetchTimeTracks]);

	const total: SummaryProps['data'] = useMemo(() => ({
		clockedTime: data.clockedTime,
		productiveTime: data.productiveTime,
		unproductiveTime: data.unproductiveTime,
		productivityRatio: data.productivityRatio,
	}), [data]);

	return (
		<FlexCenter flex="1 0 auto" flexDirection="column">
			<WithLoader
				isLoading={
					_.includes(
						['initial', 'pending'],
						asyncState.state,
					)
				}
			>
				<FlexColumn flex="1 0 auto">
					<Name onChange={ onNameChange } initial={ data.name } />
					<Summary data={ total } />
					<AddNewTimeTrack onSubmit={ onCreateTimeTrack } />
					<TracksTable
						data={ timeTracks }
						isLoading={ areTracksLoading }
					/>
				</FlexColumn>
			</WithLoader>
		</FlexCenter>
	);
});

UserProfile.displayName = 'UserProfile';
export default UserProfile;
