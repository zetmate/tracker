import React, { useMemo, useState } from 'react';
import { Typography } from 'antd';

type Props = {
	initial: string;
	onChange: (name: string) => void
}

const Name: React.FC<Props> = React.memo(({ initial, onChange }) => {
	const [name, setName] = useState<string>(null);

	const editableConfig = useMemo(() => ({
		onChange(value: string) {
			setName(value);
			onChange(value);
		},
	}), [onChange]);

	return (
		<Typography.Title editable={ editableConfig }>
			{ name || initial }
		</Typography.Title>
	);
});
Name.displayName = 'Name';
export default Name;
