import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  componentName: string;
}

const initialState: IState = {
  componentName: '',
};

const productsdealSlice = createSlice({
  name: 'productsdeal',
  initialState,
  reducers: {
    setComponentName: (state: IState, action: PayloadAction<string>) => {
      state.componentName = action.payload;
    },
  },
});

export const { setComponentName } = productsdealSlice.actions;
export const productsdealReducer = productsdealSlice.reducer;
