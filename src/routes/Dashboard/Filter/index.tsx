import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '../../../components/layout';
import { Input } from 'antd';

import { dashboard } from '../../../actions';
import FilterByDateRange from './FilterByDateRange';
import { DateRange } from '../../../utils';

const searchStyle = { width: 300 };

const Filter: React.FC = React.memo(() => {
	const dispatch = useDispatch();

	const onSearch = useCallback((value: string) => {
		dispatch(dashboard.filterUsers({ name: value }));
	}, [dispatch]);

	const onApplyDateRange = useCallback((range: DateRange) => {
		// TODO: dispatch action
	}, []);

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
