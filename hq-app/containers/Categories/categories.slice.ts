import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setKits: (state: IState, action) => {
      state.kits = [...state.kits, action.payload];
    },
  },
});

export const { setKits } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
