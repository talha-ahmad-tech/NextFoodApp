import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INVENTORY_ADJUSTMENT_NEW_DETAILS } from './types';
import { INVENTORY_ADJUSTMENT_DETAIL } from './types';

export interface IState {
  inventoryAdjustment: Array<object>;
  inventoryAdjustmentHeader: INVENTORY_ADJUSTMENT_DETAIL;
}

const initialState: IState = {
  inventoryAdjustment: [],
  inventoryAdjustmentHeader: {},
};

const inventoryAdjustmentSlice = createSlice({
  name: 'inventoryAdjustment',
  initialState,
  reducers: {
    setInventoryAdjustmentHeader: (
      state: IState,
      action: PayloadAction<INVENTORY_ADJUSTMENT_DETAIL>,
    ) => {
      state.inventoryAdjustmentHeader = action.payload;
    },
    setinventoryAdjustment: (
      state: IState,
      action: PayloadAction<INVENTORY_ADJUSTMENT_NEW_DETAILS>,
    ) => {
      state.inventoryAdjustment = [
        ...state.inventoryAdjustment,
        action.payload,
      ];
    },
  },
});

export const { setinventoryAdjustment, setInventoryAdjustmentHeader } =
  inventoryAdjustmentSlice.actions;
export const inventoryAdjustmentReducer = inventoryAdjustmentSlice.reducer;
