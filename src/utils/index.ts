export type AsyncState = {
	state: 'initial' | 'pending' | 'success' | 'error',
	msg?: string,
};

export type AsyncAction = {
	type: string,
	asyncState: AsyncState,
}
