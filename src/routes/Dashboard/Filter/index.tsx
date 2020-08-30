import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FlexRowBetween } from '../../../components/layout';
import { Input } from 'antd';

import { dashboard, UsersFilter } from '../../../actions';
import FilterByDateRange from './FilterByDateRange';
import { DateRange } from '../../../utils';

const searchStyle = { width: 300 };

const Filter: React.FC = React.memo(() => {
	const [filter, setFilter] = useState<UsersFilter>({
		isDisabled: 'false',
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (!filter) {
			return;
		}
		dispatch(dashboard.filterUsers(filter));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	const onSearch = useCallback((value: string) => {
		setFilter({
			...filter,
			name: value,
		});
	}, [filter]);

	const onApplyDateRange = useCallback((range: DateRange) => {
		setFilter({
			...filter,
			dateRange: range,
		});
	}, [filter]);

	const onBtnClick = useCallback(() => {
		setFilter({
			...filter,
			isDisabled: filter.isDisabled === 'false' ? 'true' : 'false',
		});
	}, [filter]);

	return (
		<FlexRowBetween width="100%" pb={ 30 }>
			<Input.Search
				placeholder="Search by name"
				enterButton="Search"
				onSearch={ onSearch }
				style={ searchStyle }
			/>
			<FilterByDateRange onApply={ onApplyDateRange } />
			<a onClick={ onBtnClick }>
				{
					filter.isDisabled === 'false'
						? 'Show only disabled'
						: 'Show only enabled'
				}
			</a>
		</FlexRowBetween>
	);
});
Filter.displayName = 'Filter';
export default Filter;
