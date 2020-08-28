import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { FlexCenter } from './layout';

export type WithLoaderProps = {
	children: JSX.Element,
	isLoading: boolean,
	size?: number
}

const defaultProps: Partial<WithLoaderProps> = {
	size: 30,
};

export const WithLoader: React.FC<WithLoaderProps> = React.memo((props) => {
	const { isLoading, children, size } = props;

	if (isLoading) {
		return (
			<FlexCenter height="100%">
				<PulseLoader
					color="#1890ff"
					loading={ true }
					size={ size }
				/>
			</FlexCenter>
		);
	}

	return children;
});

WithLoader.defaultProps = defaultProps;
WithLoader.displayName = 'WithLoader';
