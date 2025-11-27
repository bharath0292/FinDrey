import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';

export * from './accounts';
export * from './accountTypes';
export * from './categories';
export * from './descriptions';
export * from './subTransactionType';
export * from './transactions';
export * from './transactionTypes';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
