import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { Dashboard, LoginForm, paths } from './routes';
import { WithHeader, WithLoader } from './components';

import {
	ScreenContextValue,
	ScreenContext,
} from './context';

import { initDb } from './db';
import { message } from 'antd';
import store from './store';
import UserProfile from './routes/UserProfile';

const App: React.FC = React.memo(() => {
	// Init db before rendering anything
	const [isDbReady, setIsDbReady] = useState<boolean>(false);

	const isMobile = useMediaQuery({ query: '(max-device-width: 860px)' });
	const isVertical = useMediaQuery({ orientation: 'portrait' });

	useEffect(() => {
		initDb()
			.then(
				() => {
					setIsDbReady(true);
				},
				() => {
					message.error('Database initialization failed!', 6);
				},
			);
	}, []);

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
			<ReduxProvider store={ store }>
				<ScreenContext.Provider value={ screenInfo }>
					<WithLoader isLoading={ !isDbReady }>
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
									component={ Dashboard }
								/>
								<Route
									exact
									path={ paths.userProfile }
									component={ UserProfile }
								/>
							</Switch>
						</WithHeader>
					</WithLoader>
				</ScreenContext.Provider>
			</ReduxProvider>
		</Router>
	);
});

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('app'));
