import type { UserType } from '@findrey/types';

import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'bson';

const initialState: UserType = {
	id: new ObjectId('671b5cd66a090a1d922d7987').toHexString(),
	email: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;
