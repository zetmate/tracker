import React from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import {
	color,
	ColorProps,

	typography,
	TypographyProps,

	layout,
	LayoutProps,

	space,
	SpaceProps,

	flexbox,
	FlexboxProps,
} from 'styled-system';

/*
* Types
* */
export type NavItemProps = {
	name: string;
	path: string;
}

/*
* Component
* */
const NavItem: React.FC<NavItemProps> = React.memo((props) => {
	const { name, path } = props;

	const location = useLocation();
	const isSelected = location.pathname === path;

	return (
		<StyledNavLink
			to={ path }
			fontSize='regular'
			isSelected={ isSelected }
		>
			{ name }
		</StyledNavLink>
	);
});
NavItem.displayName = 'NavItem';
export default NavItem;

/*
* Styles
* */
type StyledProps = ColorProps & TypographyProps & LayoutProps & SpaceProps
	& NavLinkProps & FlexboxProps & {
	isSelected: boolean;
};

const getBgColor = (props: StyledProps) => {
	if (props.isSelected) {
		return 'rgba(200, 200, 200, 0.07)';
	}

	return 'transparent';
};

const StyledNavLink = styled(NavLink as React.FC<StyledProps>)`
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	transition: all ease-in-out 0.4s;

	background: ${ getBgColor };

	&:hover {
		background: rgba(240, 240, 240, 0.1);
	}

	${ layout }
	${ flexbox }
	${ space } 
	${ typography }
	${ color }
`;
