import React, { useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/en_GB';

import { DatePicker, Button, TimePicker, Form, Select } from 'antd';
import { dateFormat, TimeTrack, TimeTrackLabel } from '../../../db';
import { Flex } from '../../../components/layout';
import { FormItemNoMargin } from '../../../utils';

const checkIfDateDisabled = (date: moment.Moment): boolean => (
	date.isAfter(moment())
);

const format = 'HH:mm';

const defaultTime: [moment.Moment, moment.Moment] = [
	moment(),
	moment().add('3', 'hours'),
];

export type FormData = {
	label: TimeTrack['label'],
	date: TimeTrack['date'],
	duration: TimeTrack['duration']
}
type Props = {
	onSubmit: (data: FormData) => void
}

const fieldRules = [
	{
		required: true,
		message: 'This field is required',
	},
];

const initialValues = {
	date: moment(),
	label: 'productive' as TimeTrackLabel,
	time: defaultTime,
};

const AddNewTimeTrack: React.FC<Props> = React.memo((props) => {
	const { onSubmit } = props;

	const onFinish = useCallback((data: typeof initialValues) => {
		const [start, end] = data.time;
		let duration = end.hour() - start.hour();

		if (duration < 0) {
			duration = 24 + duration;
		}

		const parsed: FormData = {
			label: data.label,
			date: data.date.format(dateFormat),
			duration,
		};

		onSubmit(parsed);
	}, [onSubmit]);

	return (
		<Flex py={ 30 }>
			<Form
				layout="inline"
				onFinish={ onFinish }
				initialValues={ initialValues }
			>

				<Form.Item
					label="Date"
					name="date"
					rules={ fieldRules }
				>
					<DatePicker
						locale={ locale }
						disabledDate={ checkIfDateDisabled }
					/>
				</Form.Item>

				<Form.Item
					label="Time"
					name="time"
					rules={ fieldRules }
				>
					{/* @ts-ignore */ }
					<TimePicker.RangePicker
						format={ format }
						minuteStep={ 15 }
					/>
				</Form.Item>


				<Form.Item
					label="Label"
					name="label"
					rules={ fieldRules }
				>
					<Select>
						<Select.Option value="productive">
							Productive
						</Select.Option>
						<Select.Option value="unproductive">
							Unproductive
						</Select.Option>
					</Select>
				</Form.Item>

				<FormItemNoMargin>
					<Button type="primary" htmlType="submit" block>
						Add new track
					</Button>
				</FormItemNoMargin>
			</Form>
		</Flex>

	);
});

AddNewTimeTrack.displayName = 'AddNewTimeTrack';
export default AddNewTimeTrack;
