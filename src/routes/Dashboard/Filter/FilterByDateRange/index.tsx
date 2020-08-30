import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/en_GB';
import { Button, DatePicker } from 'antd';
import { dateFormat } from '../../../../db';
import { DateRange } from '../../../../utils';

type Range = [moment.Moment, moment.Moment];

type Props = {
	onApply: (range: DateRange) => void
}
const checkIfDateDisabled = (date: moment.Moment): boolean => (
	date.isAfter(moment())
);

const FilterByDateRange: React.FC<Props> = React.memo(({ onApply }) => {
	const [range, setRange] = useState<Range>(null);

	const isBtnDisabled = useMemo(() => (
		_.isNil(range) || _.isNil(range[0]) || _.isNil(range[1])
	), [range]);

	const onCalendarChange = useCallback((range: Range) => {
		setRange(range);
	}, []);

	const onBtnClick = useCallback(() => {
		onApply([
			range[0].format(dateFormat),
			range[1].format(dateFormat),
		]);
	}, [range, onApply]);

	return (
		<>
			<DatePicker.RangePicker
				locale={ locale }
				disabledDate={ checkIfDateDisabled }
				onCalendarChange={ onCalendarChange }
			/>
			<Button
				type="primary"
				disabled={ isBtnDisabled }
				onClick={ onBtnClick }
			>
				Apply date range
			</Button>
		</>
	);
});

FilterByDateRange.displayName = 'FilterByDateRange';
export default FilterByDateRange;
