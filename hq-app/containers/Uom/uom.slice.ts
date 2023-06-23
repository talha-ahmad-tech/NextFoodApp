import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { UOM_DETAILS } from './types';

export interface IState {
  uom: Array<object>;
  uomID: number;
}

const initialState: IState = {
  uom: [],
  uomID: 1,
};

const uomSlice = createSlice({
  name: 'uom',
  initialState,
  reducers: {
    setUom: (state: IState, action: PayloadAction<UOM_DETAILS>) => {
      state.uom = [...state.uom, action.payload];
    },
    setUomID: (state: IState, action: PayloadAction<number>) => {
      state.uomID = action.payload;
    },
  },
});

export const { setUom, setUomID } = uomSlice.actions;
export const uomReducer = uomSlice.reducer;
