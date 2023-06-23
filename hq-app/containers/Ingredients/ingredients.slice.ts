import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INGREDIENTS_DETAILS } from './types';

export interface IState {
  ingredients: Array<object>;
}

const initialState: IState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (
      state: IState,
      action: PayloadAction<INGREDIENTS_DETAILS>,
    ) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
