import { createSlice } from '@reduxjs/toolkit';

export interface IState {
  kits: Array<object>;
}

const initialState: IState = {
  kits: [],
};

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    setKits: (state: IState, action) => {
      state.kits = [...state.kits, action.payload];
    },
  },
});

export const { setKits } = orderHistorySlice.actions;
export const orderHistoryReducer = orderHistorySlice.reducer;
