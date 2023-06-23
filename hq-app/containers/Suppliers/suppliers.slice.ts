import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SUPPLIERS_DETAILS } from './types';

export interface IState {
  suppliers: Array<object>;
}

const initialState: IState = {
  suppliers: [],
};

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    setSuppliers: (state: IState, action: PayloadAction<SUPPLIERS_DETAILS>) => {
      state.suppliers = [...state.suppliers ,action.payload]
    },
  },
});

export const { setSuppliers } = suppliersSlice.actions;
export const suppliersReducer = suppliersSlice.reducer;
