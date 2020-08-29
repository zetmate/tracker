import _ from 'lodash';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Flex } from '../../../components/layout';
import { Form, Input, Select } from 'antd';
import { dashboard } from '../../../actions';
import { FormItemNoMargin } from '../../../utils';

const searchStyle = { width: 300 };
const selectStyle = { width: 200 };

type SelectOption = { value: string, title: string };
const selectOptions: SelectOption[] = [
	{ value: null, title: 'All time' },
];

const selectOptionsJSX = _.map(selectOptions, ({ value, title }) => (
	<Select.Option value={ value } key={ title }>{ title }</Select.Option>
));

const formInitialValues = { period: null as SelectOption['value'] };

const Filter: React.FC = React.memo(() => {
	const dispatch = useDispatch();

	const onSearch = useCallback((value: string) => {
		dispatch(dashboard.filterUsers({ name: value }));
	}, [dispatch]);

	return (
		<Flex width="100%">
			<Input.Search
				placeholder="Search by name"
				enterButton="Search"
				onSearch={ onSearch }
				style={ searchStyle }
			/>
			<Flex justifyContent="flex-end" flex="1 0 auto">
				<Form initialValues={ formInitialValues }>
					<FormItemNoMargin
						label="Period"
						name="period"
					>
						<Select
							style={ selectStyle }
						>
							{ selectOptionsJSX }
						</Select>
					</FormItemNoMargin>
				</Form>
			</Flex>
		</Flex>
	);
});
Filter.displayName = 'Filter';
export default Filter;
