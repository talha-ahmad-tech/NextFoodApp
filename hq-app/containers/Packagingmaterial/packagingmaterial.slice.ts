import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PACKAGINGMATERIAL_DETAILS } from './types';

export interface IState {
  packagingMaterial: Array<object>;
}

const initialState: IState = {
  packagingMaterial: [],
};

const packagingmaterialSlice = createSlice({
  name: 'packagingmaterial',
  initialState,
  reducers: {
    setPackagingMaterial: (
      state: IState,
      action: PayloadAction<PACKAGINGMATERIAL_DETAILS>,
    ) => {
      state.packagingMaterial = [...state.packagingMaterial, action.payload];
    },
  },
});

export const { setPackagingMaterial } = packagingmaterialSlice.actions;
export const packagingmaterialReducer = packagingmaterialSlice.reducer;
