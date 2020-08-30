import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '../../../components/layout';
import { Input } from 'antd';

import { dashboard, UsersFilter } from '../../../actions';
import FilterByDateRange from './FilterByDateRange';
import { DateRange } from '../../../utils';

const searchStyle = { width: 300 };

const Filter: React.FC = React.memo(() => {
	const [filter, setFilter] = useState<UsersFilter>({});
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

	return (
		<Flex width="100%">
			<Input.Search
				placeholder="Search by name"
				enterButton="Search"
				onSearch={ onSearch }
				style={ searchStyle }
			/>
			<FilterByDateRange onApply={ onApplyDateRange } />
		</Flex>
	);
});
Filter.displayName = 'Filter';
export default Filter;
