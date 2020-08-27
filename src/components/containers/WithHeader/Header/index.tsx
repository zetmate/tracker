import React from 'react';

import { FlexRowBetween } from '../../../layout';
import Navbar, { NavRoute } from './Navbar';
import styled from 'styled-components';

/*
* Constants
* */
const routes: NavRoute[] = [];

/*
* Component
* */
const Header: React.FC = React.memo(() => {
	return (
		<Container>
			<Navbar routes={ routes } />
		</Container>
	);
});

Header.displayName = 'Header';
export default Header;

/*
* Styles
* */
const Container = styled(FlexRowBetween)`
	width: 100%;
	height: 10vh;
	flex-shrink: 0;
`;
