import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// import { PRODUCTS_FINISHED_PRODUCT_DETAILS } from './types';

export interface IState {
  finishedProducts?: object;
  productModifiers?: [];
}

const initialState: IState = {
  finishedProducts: {},
  productModifiers: [],
};

const finishedproductSlice = createSlice({
  name: 'finishedproduct',
  initialState,
  reducers: {
    setProductModifiers: (state: IState, action: PayloadAction<[]>) => {
      state.productModifiers = action.payload;
    },
  },
});

export const { setProductModifiers } = finishedproductSlice.actions;
export const finishedproductReducer = finishedproductSlice.reducer;
