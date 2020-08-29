import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form } from 'antd';

export type AsyncState = {
	state: 'initial' | 'pending' | 'success' | 'error',
	msg?: string,
};

export type AsyncAction<T> = {
	type: string,
	asyncState: AsyncState,
	data: T
}

type AsyncActionCreator = (...args: any) => Promise<any>

type AsyncDispatch<T>
	= (actionCreator: AsyncActionCreator) => Promise<T>;

export function useAsyncDispatch<T>(): AsyncDispatch<T> {
	return useDispatch();
}

export const FormItemNoMargin = styled(Form.Item)`
	margin: 0 !important;
`;
