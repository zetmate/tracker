import _ from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { LayoutProps } from 'styled-system';

import { FlexRowBetween } from '../../../../layout';
import NavItem from '../NavItem';

/*
* Types
* */
export type NavRoute = {
	path: string;
	name: string;
}

export type NavbarProps = LayoutProps & {
	routes: NavRoute[];
	leftControls?: JSX.Element[];
	rightControls?: JSX.Element[];
}

const defaultProps: Partial<NavbarProps> = {
	leftControls: null,
	rightControls: null,
};

/*
* Component
* */
const Navbar: React.FC<NavbarProps> = React.memo((props) => {
	const { routes, leftControls, rightControls } = props;

	const navItems = useMemo(() => (
		_.map(routes, ({ name, path }) => (
			<NavItem
				name={ name }
				path={ path }
				key={ `${ name }_${ path }` }
			/>
		))
	), [routes]);

	return (
		<Container width={ containerWidth } { ...props }>
			{ leftControls }
			{ navItems }
			{ rightControls }
		</Container>
	);
});
Navbar.displayName = 'Navbar';
Navbar.defaultProps = defaultProps;
export default Navbar;

/*
* Styles
* */
const Container = styled(FlexRowBetween)`
	height: 100%;
	align-items: center;
	z-index: 1001;

	> * {
		height: 100%;
		flex: 1 0 auto
	}
	
`;

const containerWidth = [0.75, 0.75, 0.5];
