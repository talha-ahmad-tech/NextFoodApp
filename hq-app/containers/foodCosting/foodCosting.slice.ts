import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FOOD_COSTING_DETAILS } from './types';

export interface IState {
  foodCosting: Array<object>;
}

const initialState: IState = {
  foodCosting: [],
};

const foodCostingSlice = createSlice({
  name: "foodCosting",
  initialState,
  reducers: {
    setfoodCosting: (state: IState, action: PayloadAction<FOOD_COSTING_DETAILS>) => {
      state.foodCosting = [...state.foodCosting ,action.payload]
    },
  },
});

export const { setfoodCosting } = foodCostingSlice.actions;
export const foodCostingReducer = foodCostingSlice.reducer;
