import React from 'react';

export type ScreenContextValue = {
	isMobile: boolean,
	isVertical: boolean,
}
export const defaultScreenContext: ScreenContextValue = {
	isMobile: false,
	isVertical: false,
};

export const ScreenContext = React.createContext(defaultScreenContext);
