'use client';

import type React from 'react';

import { store } from '@findrey/store';

import { Provider } from 'react-redux';

export const ReduxProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <Provider store={store}>{children}</Provider>;
};
