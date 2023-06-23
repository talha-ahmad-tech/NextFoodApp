import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PRICELIST_DETAILS } from './types';

export interface IState {
  priceType?: number;
  headerData?: PRICELIST_DETAILS;
}

const initialState: IState = {
  priceType: 1,
  headerData: {},
};

const pricelistSlice = createSlice({
  name: 'pricelist',
  initialState,
  reducers: {
    setPriceList: (state: IState, action: PayloadAction<number>) => {
      state.priceType = action.payload;
    },
    setHeaderData: (
      state: IState,
      action: PayloadAction<PRICELIST_DETAILS>,
    ) => {
      state.headerData = action.payload;
    },
  },
});

export const { setPriceList, setHeaderData } = pricelistSlice.actions;
export const pricelistReducer = pricelistSlice.reducer;
