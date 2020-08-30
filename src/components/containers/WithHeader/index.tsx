import styled from 'styled-components';
import React, { useMemo } from 'react';

import Header from './Header';

export type Props = {
	shouldHideHeader?: boolean;
}

const defaultProps: Partial<Props> = {
	shouldHideHeader: false,
};

/**
 * Container with navigation header and bg styling
 */
const WithHeader: React.FC<Props> = React.memo((props) => {
	const { children, shouldHideHeader } = props;

	const header = useMemo(() => (
		shouldHideHeader ? null : <Header />
	), [shouldHideHeader]);

	return (
		<StyledMain>
			{ header }
			<StyledChildrenContainer>
				{ children }
			</StyledChildrenContainer>
		</StyledMain>
	);
});
WithHeader.defaultProps = defaultProps;
WithHeader.displayName = 'WithHeader';

export default WithHeader;

/*
* Styles
* */
const StyledMain = styled.main`
	min-height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledChildrenContainer = styled.section`
	display: flex;
	flex-direction: column;
	flex: 1 0 auto;
	
	> div {
		> * {
			background: #fff;
		}
	}
`;
