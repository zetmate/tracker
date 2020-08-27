import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { paths } from './routes';
import { WithHeader } from './components';
import LoginForm from './routes/LoginOrRegister';

import {
	ScreenContextValue,
	ScreenContext,
} from './context';

const App: React.FC = React.memo(() => {
	const isMobile = useMediaQuery({ query: '(max-device-width: 860px)' });
	const isVertical = useMediaQuery({ orientation: 'portrait' });

	const screenInfo: ScreenContextValue = useMemo(() => ({
		isMobile,
		isVertical,
	}), [isMobile, isVertical]);

	const IndexRedirect = useCallback(() => (
		<Redirect to={ paths.login } />
	), []);

	const Register = useCallback((props: RouteProps) => (
		<LoginForm { ...props } isNewUser />
	), []);

	return (
		<Router>
			<ScreenContext.Provider value={ screenInfo }>
				<WithHeader shouldHideHeader>
					<Switch>
						<Route
							exact
							path={ paths.index }
							component={ IndexRedirect }
						/>
						<Route
							exact
							path={ paths.login }
							component={ LoginForm }
						/>
						<Route
							exact
							path={ paths.register }
							component={ Register }
						/>
						<Route
							exact
							path={ paths.dashboard }
							component={ () => <div>Dashboard</div> }
						/>
					</Switch>
				</WithHeader>
			</ScreenContext.Provider>
		</Router>
	);
});

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('app'));
