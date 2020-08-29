import { AsyncAction, AsyncState } from '../../utils';
import { ThunkAction } from 'redux-thunk';

export type AsyncActionCreator<T>
	= (asyncState: AsyncState, data?: T) => AsyncAction<T>;

export function getAsyncActionCreator<T>(type: string): AsyncActionCreator<T> {
	return (asyncState, data: T = {} as T) => ({
		type,
		asyncState,
		data,
	});
}

export type ThunkReturnType = ThunkAction<Promise<any>, any, undefined, any>;
