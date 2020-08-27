import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Form, Input, Button, Typography } from 'antd';
import { FlexCenter, FlexColumnBetween } from '../../components/layout';

// Types
type LoginFormData = {
	username: string;
	password: string;
}

// Input rules
const userNameRules = [
	{
		required: true,
		message: 'Please input your username!',
	},
];
const passwordRules = [
	{
		required: true,
		message: 'Please input your password!',
	},
];

/**
 * Login screen component
 */
const Login: React.FC = React.memo(() => {
	const onFinish = useCallback((args) => console.log(args), []);

	return (
		<Container>
			<FormContainer>
				<StyledTitle level={ 3 }>
					Welcome back!
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
						>
							Log in
						</Submit>
					</FormItemNoMargin>
				</StyledForm>
			</FormContainer>
		</Container>
	);
});
Login.displayName = 'Login';
export default Login;

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
