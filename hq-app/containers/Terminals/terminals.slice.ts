import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TERMINAL_FORM } from './types';

export interface IState {
  terminal: {};
}

const initialState: IState = {
  terminal: {},
};

const terminalsSlice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {
    setTerminals: (state: IState, action: PayloadAction<TERMINAL_FORM>) => {
      state.terminal = action.payload;
    },
  },
});

export const { setTerminals } = terminalsSlice.actions;
export const terminalsReducer = terminalsSlice.reducer;
