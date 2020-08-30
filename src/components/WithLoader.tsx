import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { FlexCenter } from './layout';
import styled from 'styled-components';

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
			<Container height="100%">
				<PulseLoader
					color="#fff"
					loading={ true }
					size={ size }
				/>
			</Container>
		);
	}

	return children;
});

WithLoader.defaultProps = defaultProps;
WithLoader.displayName = 'WithLoader';

const Container = styled(FlexCenter)`
	background: #2363b1 !important;
`;
