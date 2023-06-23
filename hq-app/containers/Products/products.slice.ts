import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setKits: (state: IState, action) => {
      state.kits = [...state.kits, action.payload];
    },
  },
});

export const { setKits } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
