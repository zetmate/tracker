import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Form, Input, Button, Typography, message } from 'antd';
import { FlexCenter, FlexColumnBetween } from '../../components/layout';
import paths from '../paths';
import { api, AuthData } from '../../config';

// Types
export type LoginFormProps = {
	isNewUser: boolean;
}

// Validation
const min8CharsRegex = new RegExp('^.{8,}$');
const containsCapitalRegex = new RegExp('[A-Z]+');
const containsNumberRegex = new RegExp('\\d+');

const validatePassword = (rule: any, pwd: string): Promise<any> => {
	if (!min8CharsRegex.test(pwd)) {
		return Promise.reject('Password should be at least 8 characters long!');
	}
	if (!containsCapitalRegex.test(pwd)) {
		return Promise.reject(
			'Password should contain at least one capital letter',
		);
	}
	if (!containsNumberRegex.test(pwd)) {
		return Promise.reject(
			'Password should contain at least one number',
		);
	}
	return Promise.resolve();
};

// Input rules
const userNameRules = [
	{
		required: true,
		message: 'Please input your username!',
	},
];
const passwordRulesLogin = [
	{
		required: true,
		message: 'Please input your password!',
	},
];
const passwordRulesRegister = [
	...passwordRulesLogin,
	{
		validator: validatePassword,
	},
];

/**
 * LoginForm component
 */
const LoginForm: React.FC<LoginFormProps> = React.memo(({ isNewUser }) => {
	const history = useHistory();
	const [isPending, setIsPending] = useState<boolean>(false);

	const onFinish = useCallback((data: AuthData) => {
		setIsPending(true);

		if (isNewUser) {
			api.signUp(data)
				.then(
					() => {
						message.success(`
							New user with name ${ data.username } 
							has been created`,
						);
						history.replace(paths.dashboard);
					},
					() => {
						message.error('Can not create a user');
						setIsPending(false);
					},
				);
			return;
		}
		api.login(data)
			.then(
				() => history.replace(paths.dashboard),
				() => message.error('Something went wrong'),
			)
		;
	}, [history, isNewUser]);

	const greetingText = useMemo(() => (
		isNewUser
			? 'Hi, here you can create an account :)'
			: 'Welcome back!'
	), [isNewUser]);

	const submitBtnText = useMemo(() => (
		isNewUser ? 'Sign up' : 'Log in'
	), [isNewUser]);

	const passwordRules = useMemo(() => (
		isNewUser ? passwordRulesRegister : passwordRulesLogin
	), [isNewUser]);

	const bottomControl = useMemo(() => (
		isNewUser
			? null
			: (
				<FlexCenter>
					<StyledLinkButton
						type="link"
						onClick={ () => {
							history.replace(paths.register);
						} }
					>
						create new account
					</StyledLinkButton>
				</FlexCenter>
			)
	), [isNewUser, history]);

	return (
		<Container>
			<FormContainer>
				<StyledTitle level={ 3 }>
					{ greetingText }
				</StyledTitle>
				<StyledForm layout="vertical" onFinish={ onFinish }>
					<Form.Item
						label="Username"
						name="username"
						rules={ userNameRules }
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={ passwordRules }
					>
						<Input.Password />
					</Form.Item>

					<FormItemNoMargin>
						<Submit
							size="large"
							type="primary"
							htmlType="submit"
							block
							loading={ isPending }
						>
							{ submitBtnText }
						</Submit>
					</FormItemNoMargin>
					{ bottomControl }

				</StyledForm>
			</FormContainer>
		</Container>
	);
});
LoginForm.displayName = 'LoginForm';
export default LoginForm;

// Styles
const Container = styled(FlexCenter)`
	flex: 1 0 auto;
`;

const Submit = styled(Button)`
	margin-top: 8px;
`;

const FormContainer = styled(FlexColumnBetween)`
	padding: 28px;
	box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
	border-radius: 20px;
`;

const StyledForm = styled(Form)`
	width: 400px;
`;

const FormItemNoMargin = styled(Form.Item)`
	margin: 0 !important;
`;

const StyledTitle = styled(Typography.Title)`
	// NB: use important there to override antd styles
	margin-bottom: 1em !important;
`;

const StyledLinkButton = styled(Button)`
	margin-top: 6px;
`;
