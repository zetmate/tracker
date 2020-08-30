import React, { useMemo } from 'react';
import { FlexRowBetween } from '../../../components/layout';
import { Statistic } from 'antd';

export type SummaryProps = {
	data: {
		users?: number
		clockedTime: number
		productiveTime: number
		unproductiveTime: number
		productivityRatio?: number
	}
}

const Summary: React.FC<SummaryProps> = React.memo(({ data }) => {
	const usersStat = useMemo(() => (
		data.users
			? (
				<Statistic
					title="Total users"
					value={ data.users }
				/>
			)
			: null
	), [data.users]);

	const productivityStat = useMemo(() => (
		data.productivityRatio
			? (
				<Statistic
					title="Productivity ratio"
					value={ data.productivityRatio }
					precision={ 2 }
				/>
			)
			: null
	), [data.productivityRatio]);

	return (
		<FlexRowBetween pb={ 15 }>
			{ usersStat }
			<Statistic
				title="Total clocked time"
				value={ data.clockedTime }
				precision={ 2 }
			/>
			<Statistic
				title="Total productive time"
				value={ data.productiveTime }
				precision={ 2 }
			/>
			<Statistic
				title="Total unproductive time"
				value={ data.unproductiveTime }
				precision={ 2 }
			/>
			{ productivityStat }
		</FlexRowBetween>
	);
});
Summary.displayName = 'Summary';
export default Summary;
