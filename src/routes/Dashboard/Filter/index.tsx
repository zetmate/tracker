import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '../../../components/layout';
import { Input } from 'antd';
import { dashboard } from '../../../actions';

const searchStyle = { width: 300 };

const Filter: React.FC = React.memo(() => {
	const dispatch = useDispatch();

	const onSearch = useCallback((value: string) => {
		dispatch(dashboard.filterUsers({ name: value }));
	}, [dispatch]);

	return (
		<Flex>
			<Input.Search
				placeholder="Search by name"
				enterButton="Search"
				onSearch={ onSearch }
				style={ searchStyle }
			/>
		</Flex>
	);
});
Filter.displayName = 'Filter';
export default Filter;
