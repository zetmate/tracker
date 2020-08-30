import React from 'react';
import { FlexRowBetween } from '../../../components/layout';
import { Statistic } from 'antd';
import { UsersData } from '../../../db';

type Props = {
	data: UsersData['total']
}

const Summary: React.FC<Props> = React.memo(({ data }) => {
	return (
		<FlexRowBetween>
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
		</FlexRowBetween>
	);
});
Summary.displayName = 'Summary';
export default Summary;
