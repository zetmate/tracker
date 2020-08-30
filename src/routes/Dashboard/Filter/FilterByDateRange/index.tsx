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

const defaultMinDate = moment().subtract(1, 'year');

const FilterByDateRange: React.FC<Props> = React.memo(({ onApply }) => {
	const [range, setRange] = useState<Range>(null);

	const btnText = useMemo(() => (
		range ? 'Apply date range' : 'Reset date range'
	), [range]);

	const onCalendarChange = useCallback((range: Range) => {
		setRange(range && [
			range[0] || defaultMinDate,
			range[1] || moment(),
		]);
	}, []);

	const onBtnClick = useCallback(() => {
		const formattedRange = range
			? [
				range[0].format(dateFormat),
				range[1].format(dateFormat),
			]
			: null;

		onApply(formattedRange as DateRange);

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
				onClick={ onBtnClick }
			>
				{ btnText }
			</Button>
		</>
	);
});

FilterByDateRange.displayName = 'FilterByDateRange';
export default FilterByDateRange;
