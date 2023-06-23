import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TABLEORDERING_DETAILS } from './types';

export interface IState {
  tableordering: Array<object>;
}

const initialState: IState = {
  tableordering: [],
};

const tableorderingSlice = createSlice({
  name: "tableordering",
  initialState,
  reducers: {
    setTableordering: (state: IState, action: PayloadAction<TABLEORDERING_DETAILS>) => {
      state.tableordering = [...state.tableordering ,action.payload]
    },
  },
});

export const { setTableordering } = tableorderingSlice.actions;
export const tableorderingReducer = tableorderingSlice.reducer;
