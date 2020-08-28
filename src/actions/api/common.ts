import { AsyncAction, AsyncState } from '../../utils';

export type AsyncActionCreator = (asyncState: AsyncState) => AsyncAction;

export const getAsyncActionCreator = (type: string): AsyncActionCreator => (
	asyncState => ({ type, asyncState })
);
